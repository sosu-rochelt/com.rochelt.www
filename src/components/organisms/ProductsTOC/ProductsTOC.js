import cx from 'classnames';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import { scroller } from 'react-scroll';

import Slick from 'react-slick';
import Scroll from 'react-scroll';
var Element = Scroll.Element;

import Icon from '../../atoms/Icon';
import Heading from '../../atoms/Heading';
import styles from './ProductsTOC.scss';

class ProductsTOC extends React.Component {
  constructor(props) {
    super(props);
    let temp = map(props.products, function(product, index) {
      product.index = index;
      return product;
    });
    this.state = {
      showToc: false,
      activeIndex: 0,
      productsByCategory: groupBy(temp, 'category')
    };
    // let test =
    // console.log('test', test);
    // console.log('props:', props);
  }

  changeActiveIndex = (event, index) => {
    console.log(event, index);
    // this.setState({
    // 	activeIndex: index
    // });
    this.props.changeActiveIndex(index);
  };

  // shouldComponentUpdate(nextProps, nextState) {
  // 	// console.log(this.state);
  // 	// if (this.state.activeIndex !== nextState.activeIndex) {
  // 	//   console.log(typeof this.props.changeActiveIndex);
  // 	//   this.props.changeActiveIndex(nextState.activeIndex);
  // 	// }
  // 	// if (this.props.activeIndex !== nextProps.activeIndex) {
  // 	//   this.refs.slider.innerSlider.slickGoTo(nextProps.activeIndex);
  // 	// }
  // 	return false;
  // }

  // componentWillUpdate(nextProps, nextState) {
  // 	// this.refs.slider.innerSlider.slickGoTo(nextProps.activeIndex);
  // }

  // <input onChange={event => this.changeHandler(event)} defaultValue={0} type='range' min={0} max={this.props.children.length - 1} />

  render() {
    const scrollTo = name => {
      scroller.scrollTo(name, {
        duration: 1500.1,
        delay: 100,
        smooth: true,
        offset: -50
      });
    };
    let container = (
      <div
        className="productsTOC-container"
        onMouseEnter={() => {
          this.setState({ showToc: true });
        }}
        onMouseLeave={() => {
          this.setState({ showToc: false });
        }}
      >
        {Object.keys(this.state.productsByCategory).map(function(item, key) {
          return (
            <div
              className="productsTOC-category"
              key={'productsTOC-category-' + key}
            >
              <Heading element="h3">{item}</Heading>
              {this.state.productsByCategory[item].map(
                (item, index) => (
                  <div
                    className={cx({
                      'productsTOC-product': true,
                      'productsTOC-product--active':
                        this.props.activeIndex === item.index
                    })}
                    key={'productsTOC-product-' + index}
                    onClick={() => {
                      scrollTo('products');
                      this.changeActiveIndex(event, item.index);
                      this.setState({ showToc: false });
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                ),
                this
              )}
            </div>
          );
        }, this)}
        <div className="productsTOC-category">
          <Heading element="h3">Naturstark</Heading>
          <div
            className={cx({
              'productsTOC-product': true
            })}
            onClick={() => {
              scrollTo('besonderes');
              console.log('scroll to bottom');
            }}
          >
            <span>mehr info</span>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <div className="productsTOC">
          <Element className="bookmark" name="products" />
          <input
            type="checkbox"
            className="productsTOC-toggle"
            id="productsTOC-toggle"
            checked={this.state.showToc}
          />
          <label
            className="productsTOC-label"
            onClick={() => {
              this.setState({ showToc: !this.state.showToc });
            }}
          >
            <Heading element="h3">
              Alle Sorten
              <Icon name="arrowRight" size="14" colorName="grey" />
            </Heading>
          </label>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {this.state.showToc ? container : ''}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default ProductsTOC;
