import cx from 'classnames';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import Slick from 'react-slick';
import { Element } from 'react-scroll';
import Measure from 'react-measure';

import * as AppActions from '../../../actions/AppActions';

import Arrow from '../../atoms/Arrow';
import Image from '../../atoms/Image';
import ResponsiveImage from '../../atoms/ResponsiveImage';

import ProductInfo from '../../molecules/ProductInfo';

import styles from './ProductSlider.scss';

const ProductImage = ({ bottleShot, fruitShot, ...otherProps }) => {
  return <ResponsiveImage src={bottleShot} relativeWidth={35} />;
};

class ProductSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      height: 0
    };
  }

  render() {
    var heights = [];
    return (
      <div>
        <Element name="productSlider" />
        <div
          className="productSlider"
          style={{
            height: this.state.height
          }}
        >
          {this.props.products.map((item, index) => (
            <Measure
              bounds
              key={`productslider-measure-${index}`}
              onResize={contentRect => {
                if (index === this.props.products.length - 1) {
                  this.setState({
                    height: Math.max(...heights)
                  });
                }
                if (index === 0) {
                  heights = [];
                }
                heights.push(contentRect.bounds.height);
              }}
            >
              {({ measureRef }) => (
                <div
                  ref={measureRef}
                  className={cx({
                    productSlide: true,
                    'productSlide--active': this.props.activeIndex === index
                  })}
                  key={'productSlide-' + index}
                >
                  <div className="productImage">
                    <ProductImage
                      bottleShot={this.props.products[index].productShot}
                      fruitShot={this.props.products[index].image}
                    />
                  </div>
                  <ProductInfo
                    item={this.props.products[index]}
                    index={index}
                    activeIndex={index}
                  />
                </div>
              )}
            </Measure>
          ))}

          <Arrow
            className="productSlider-left"
            direction="left"
            size="20"
            onClick={e => {
              let index =
                this.props.activeIndex - 1 < 0
                  ? this.props.products.length - 1
                  : this.props.activeIndex - 1;
              this.props.changeActiveIndex(index % this.props.products.length);
              AppActions.displayTab(0);
            }}
          />
          <Arrow
            className="productSlider-right"
            direction="right"
            size="20"
            onClick={e => {
              this.props.changeActiveIndex(
                (this.props.activeIndex + 1) % this.props.products.length
              );
              AppActions.displayTab(0);
            }}
          />
        </div>
      </div>
    );
  }
}

export default ProductSlider;
