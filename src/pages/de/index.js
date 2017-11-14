import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import include from 'underscore.string/include';

import Hamburger from '../../components/atoms/Hamburger';
import FullsizeImage from '../../components/atoms/FullsizeImage';
import Heading from '../../components/atoms/Heading';
import Icon from '../../components/atoms/Icon';
import LanguageSelection from '../../components/atoms/LanguageSelection';

import Footer from '../../components/organisms/Footer';

import NavigationBlock from '../../components/molecules/NavigationBlock';

class Home extends React.Component {
  render() {
    return (
      <div className="fullPage">
        <FullsizeImage
          src="http://rochelt.kevinfoerster.com/images/home/rochelt_home_01.jpg"
          video="http://rochelt.kevinfoerster.com/images/home/rochelt_home_01_720p.mp4"
          type="video"
        >
          <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
          <Hamburger />
          <NavigationBlock
            doesChangeOnFocus={false}
            navigationStructure={get(
              this,
              'props.data.site.siteMetadata.navigation'
            )}
          />
          <LanguageSelection
            dark={false}
            languages={[
              { lang: 'de', label: 'de' }
              // {lang: 'en', label: 'en'}
            ]}
          />
          <div className="name-wrapper">
            <Link to={'/de/was/'}>
              <Icon name={'name'} colorName="white" size="100%" />
            </Link>
            <p className="subtitle">
              {get(this, 'props.data.site.siteMetadata.subline.de')}
            </p>
          </div>
          <Footer>
            <a
              href="https://www.instagram.com/schnapsbrenner_at_rochelt/"
              target="_blank"
            >
              <Icon name="instagram" colorName="white" size="24px" />
            </a>

            <Link to="/de/imprint/" className="footer-links">
              Impressum / Datenschutz
            </Link>
          </Footer>
        </FullsizeImage>
      </div>
    );
  }
}

Home.propTypes = {
  route: React.PropTypes.object
};

export default Home;

export const pageQuery = graphql`
  query DefaultQuery {
    site {
      siteMetadata {
        navigation {
          name
          path
        }
        title
        subline {
          de
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            name
            path
          }
        }
      }
    }
  }
`;
