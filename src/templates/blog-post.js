import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import Markdown from 'react-remarkable';
import Waypoint from 'react-waypoint';

import * as AppActions from '../actions/AppActions';

import Copy from '../components/atoms/Copy';
import Bookmark from '../components/atoms/Bookmark';
import Divider from '../components/atoms/Divider';
import Heading from '../components/atoms/Heading';
import Icon from '../components/atoms/Icon';
import Hamburger from '../components/atoms/Hamburger';
import Image from '../components/atoms/Image';
import Video from '../components/atoms/Video';
import ScrollToTop from '../components/atoms/ScrollToTop';

import ContentBlock from '../components/molecules/ContentBlock';
import InfoGraphic from '../components/molecules/InfoGraphic';
import InfoGraphicCaption from '../components/molecules/InfoGraphicCaption';
import InfoGraphicStatic from '../components/molecules/InfoGraphicStatic';
import InfoGraphicScroll from '../components/molecules/InfoGraphicScroll';
import InfoGraphicSlider from '../components/molecules/InfoGraphicSlider';
import IntroBlock from '../components/molecules/IntroBlock';
import NavigationBlock from '../components/molecules/NavigationBlock';
import Quote from '../components/molecules/Quote';
import Principles from '../components/molecules/Principles';
import TimelineElement from '../components/molecules/TimelineElement';
import Vendors from '../components/molecules/Vendors';

import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';
import ProductOverview from '../components/organisms/ProductOverview';
import Slider from '../components/organisms/Slider';
import Timeline from '../components/organisms/Timeline';

class BlogPostTemplate extends React.Component {
  constructor() {
    super();

    // this.handleScroll = throttle(this.handleScroll, 1000);
  }
  handleScroll(event) {
    // AppActions.updateScrollPosition(
    //   window.pageYOffset || document.documentElement.scrollTop
    // );
  }
  componentWillMount() {
    AppActions.updateCurrentPage(get(this, 'props.location.pathname'));
    // if (typeof window !== 'undefined') {
    //   window.addEventListener('scroll', this.handleScroll);
    // }
  }

  render() {
    const pages = this.props.data.pages;
    const productList = sortBy(this.props.data.products.edges, 'order');

    let navigationStructure = get(
      this,
      'props.data.site.siteMetadata.navigation'
    );
    const post = pages;

    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const introTitle =
      get(post, 'frontmatter.intro.title') || 'intro title missing';
    const introText =
      get(post, 'frontmatter.intro.text') || 'intro text missing';
    const title = get(post, 'frontmatter.title');
    const subline = get(post, 'frontmatter.subline');

    const structureData = get(post, 'frontmatter.structure')
      ? get(post, 'frontmatter.structure')
      : {};

    let structure;
    if (structureData.length) {
      structure = structureData.map(function(item, structureIndex) {
        switch (item.type) {
          case 'productCircle':
            let products = {};
            if (productList.length) {
              products = productList.map(function(product) {
                (product.name = get(product, 'node.frontmatter.name')),
                  (product.category = get(
                    product,
                    'node.frontmatter.category'
                  )),
                  (product.image = get(product, 'node.frontmatter.image'));
                product.facts = get(product, 'node.frontmatter.facts');
                product.tasting = get(product, 'node.frontmatter.tasting');
                product.productShot = get(
                  product,
                  'node.frontmatter.productShot'
                );
                return product;
              });

              // products = products;
            }

            return (
              <ProductOverview
                products={products}
                key={`ProductOverview-${structureIndex}`}
              />
            );
          case 'image':
            return (
              <Image
                src={item.content.src}
                variant={item.variant ? item.variant : []}
                key={`Image-${structureIndex}`}
              />
            );
          case 'video':
            return (
              <Video
                src={item.content.src}
                poster={item.content.overlay}
                variant={item.variant ? item.variant : []}
                key={`Video-${structureIndex}`}
              />
            );
          case 'infographic':
            return (
              <InfoGraphic
                background={item.content.src}
                overlay={item.content.overlay}
                items={item.content.items}
                key={`InfoGraphic-${structureIndex}`}
              />
            );
          case 'infographicstatic':
            return (
              <InfoGraphicStatic
                background={item.content.src}
                overlay={item.content.overlay}
                key={`InfoGraphicStatic-${structureIndex}`}
              />
            );
          case 'infographiccaption':
            return (
              <InfoGraphicCaption
                background={item.content.src}
                overlay={item.content.overlay}
                variant={item.variant ? item.variant : []}
                items={item.content.items}
                key={`InfoGraphicCaption-${structureIndex}`}
              />
            );
          case 'infographicscroll':
            return (
              <InfoGraphicScroll
                background={item.content.src}
                overlay={item.content.overlay}
                items={item.content.items}
                key={`InfoGraphicScroll-${structureIndex}`}
              />
            );
          case 'infographicslider':
            return (
              <InfoGraphicSlider
                background={item.content.src}
                overlay={item.content.overlay}
                items={item.content.items}
                key={`InfoGraphicScroll-${structureIndex}`}
              />
            );
          case 'vendors':
            return (
              <Vendors
                items={item.content.items}
                label={item.content.text}
                id={item.content.id}
                key={`Vendors-${structureIndex}`}
              />
            );
          case 'bookmark':
            const index = findIndex(navigationStructure, {
              name: get(post, 'frontmatter.title').toLowerCase()
            });

            if (!navigationStructure[index].hasOwnProperty('bookmarks')) {
              navigationStructure[index]['bookmarks'] = [];
            }
            navigationStructure[index]['bookmarks'].push(item.content);
            navigationStructure[index]['bookmarks'] = uniq(
              navigationStructure[index]['bookmarks']
            );
            return (
              <Bookmark
                name={item.content.src}
                key={`Bookmark-${structureIndex}`}
              />
            );
          case 'principles':
            return (
              <Principles
                items={item.content.items}
                key={`Principles-${structureIndex}`}
              />
            );
          case 'quote':
            return (
              <Quote
                mode={item.content.items[0].type}
                quote={{
                  copy: item.content.items[0].copy,
                  author: item.content.items[0].author,
                  image: item.content.items[0].image
                }}
                key={`Quote-${structureIndex}`}
                variant={item.variant ? item.variant : []}
              />
            );
          case 'timeline':
            let currentAlignment = 'right';
            let lastAlignment = 'left';

            return (
              <div
                className="timeline-wrapper"
                key={`Timeline-${structureIndex}`}
              >
                <Timeline>
                  {item.content.items.map(function(item, index) {
                    switch (item.type) {
                      case 'divider':
                        return (
                          <TimelineElement
                            type="divider"
                            alignment="center"
                            key={`TimelineElement-${index}`}
                          />
                        );
                      case 'placeholder':
                        [currentAlignment, lastAlignment] = [
                          lastAlignment,
                          currentAlignment
                        ];
                        return (
                          <TimelineElement
                            type="placeholder"
                            alignment={currentAlignment}
                            key={`TimelineElement-${index}`}
                          >
                            <Markdown options={{ breaks: true }}>
                              {item.copy}
                            </Markdown>
                          </TimelineElement>
                        );
                      default:
                        [currentAlignment, lastAlignment] = [
                          lastAlignment,
                          currentAlignment
                        ];
                        return (
                          <TimelineElement
                            key={`TimelineElement-${index}`}
                            label={item.label}
                            alignment={currentAlignment}
                            type={item.type}
                          >
                            <Markdown options={{ breaks: true }}>
                              {item.copy}
                            </Markdown>
                          </TimelineElement>
                        );
                    }
                  })}
                </Timeline>
                <Icon
                  name="logo"
                  size="55"
                  colorName="grey"
                  key={`Icon-${structureIndex}`}
                />
              </div>
            );
          case 'copy':
            return (
              <div className="content" key={`Copy-${structureIndex}`}>
                <Copy>{item.content.text}</Copy>
              </div>
            );
          case 'divider':
            return (
              <Divider
                key={`Divider-${structureIndex}`}
                variant={item.variant ? item.variant : []}
              />
            );
          case 'slider':
            return (
              <Slider
                variant={item.variant ? item.variant : []}
                key={`Slider-${structureIndex}`}
              >
                {map(item.content.items, function(item, index) {
                  return (
                    <div className="slider-slide" key={`slide-${index}`}>
                      {item.copy ? (
                        <div className="slide-text">
                          <Markdown options={{ breaks: true }}>
                            {item.copy}
                          </Markdown>
                        </div>
                      ) : (
                        ''
                      )}

                      <div className="slide-image">
                        <Image src={item.image} />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            );
          case 'slider-text-below':
            return (
              <Slider variant="text-below" key={`Slider-${structureIndex}`}>
                {map(item.content.items, function(item, index) {
                  return (
                    <div className="slider-slide" key={index}>
                      <div className="slide-image">
                        <Image src={item.image} />
                      </div>
                      <div className="slide-text">
                        <Markdown options={{ breaks: true }}>
                          {item.copy}
                        </Markdown>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            );
          default:
        }
      });
    }

    return (
      <div>
        <Helmet
          title={`${post.frontmatter.title
            ? post.frontmatter.title + ' |'
            : ''}  ${siteTitle}`}
        />
        <Hamburger />

        <NavigationBlock
          dark={true}
          navigationStructure={navigationStructure}
          currentPage={get(post, 'frontmatter.intro.path')}
          doesChangeOnFocus={true}
        />
        <Header
          title={title}
          subline={subline}
          src={get(post, 'frontmatter.headerImg')}
          variant={get(post, 'frontmatter.headerVariant')}
          navigationStructure={navigationStructure}
        />
        <IntroBlock>
          <Divider variant={['small', 'no-top-margin']} />
          <Heading element="h2">{introTitle}</Heading>
          <Markdown options={{ breaks: true, linkify: true }}>
            {introText}
          </Markdown>
        </IntroBlock>
        <ContentBlock>
          <div className="contentBlock-wrapper">{structure}</div>
        </ContentBlock>
        <Footer>
          <Icon name="name" colorName="grey" size="200" />

          <address className="footer-address">
            <span>BRENNEREI ROCHELT GMBH</span>
            <span>INNSTRASSE 2</span>
            <span>A - 6122 FRITZENS</span>
          </address>

          <p className="footer-contact">
            <span>TEL +43 5224 52 4 62</span>
            <span>FAX +43 5224 52 4 62-20</span>
            <span>
              <a href="mailto:mail@rochelt.com">MAIL@ROCHELT.COM</a>
            </span>
          </p>
          <a
            href="https://www.instagram.com/schnapsbrenner_at_rochelt/"
            target="_blank"
          >
            <Icon name="instagram" colorName="grey" size="24px" />
          </a>
          <Link to="/de/imprint/" className="footer-links">
            Impressum / Datenschutz
          </Link>
        </Footer>
        <ScrollToTop />
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query getData($path: String!) {
    products: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "product" } } }
      sort: { fields: [frontmatter___order] }
    ) {
      edges {
        node {
          html
          frontmatter {
            name
            facts
            order
            path
            image
            tasting
            productShot
            type
            category
          }
        }
      }
    }
    site {
      siteMetadata {
        navigation {
          name
          path
        }
        title
      }
    }
    pages: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        id
        path
        structure {
          type
          variant
          content {
            id
            src
            overlay
            text
            items {
              copy
              label
              type
              image
              author
            }
          }
        }
        title
        subline
        headerImg
        headerVariant
        intro {
          text
          title
        }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
