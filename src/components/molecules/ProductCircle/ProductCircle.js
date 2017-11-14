import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

var scroller = Scroll.scroller;

// import Measure from 'react-measure'

import ResponsiveImage from '../../atoms/ResponsiveImage';

import cx from 'classnames';

import styles from './ProductCircle.scss';
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

const Circle = ({
  width,
  numberOfItems,
  children,
  index,
  selectProduct,
  active,
  ...otherProps
}) => {
  var radius = width * 0.75 / 2;
  var step = 2 * Math.PI / numberOfItems,
    angle = step * index - Math.PI / 2,
    height = width;

  var x = Math.round(width / 2 + radius * Math.cos(angle) - 100 / 2);
  var y = Math.round(height / 2 + radius * Math.sin(angle) - 100 / 2);

  const scrollToProduct = () => {
    scroller.scrollTo('productSlider', {
      duration: 1500.1,
      delay: 100,
      smooth: true,
      offset: -50
    });
  };
  return (
    <div
      style={{
        left: x,
        top: y
      }}
      className={cx({
        'productCircle-item': true,
        'productCircle-item--active': active === index
      })}
      onMouseOver={selectProduct}
      onClick={e => {
        selectProduct(e, index);
        scrollToProduct();
      }}
    >
      {children}
    </div>
  );
};

const ProductCircleName = ({ name, category, ...otherProps }) => {
  return (
    <div className="productCircle-name">
      <div>
        <span className="productCircle-category">{category}</span>
        <span className="h2">{name}</span>
      </div>
    </div>
  );
};

const ProductCircleHand = ({ deg, ...otherProps }) => {
  const styles = {
    transform: `rotate(${deg}deg)`
  };
  return (
    <div className="productCircle-hand" style={styles}>
      <span />
    </div>
  );
};

const ProductCircleImage = ({ product }) => {
  return (
    <div
      className={product.type}
      name={product.title}
      title={product.title}
      data-category={product.category}
    >
      <ResponsiveImage
        src={product.image}
        relativeWidth={10}
        alt={product.title + ' - ' + product.category}
      />
    </div>
  );
};

import Measure from 'react-measure';
import classNames from 'classnames';

class ProductCircle extends React.Component {
  state = {
    dimensions: {
      width: -1,
      height: -1
    },
    activeProductIndex: 0,
    activeProductName: '',
    activeProductCategory: '',
    productsList: this.props.products
  };

  constructor(props) {
    super(props);
    // if (!this.state.productsList) {
    //   alert('no product data loaded')
    // }
  }

  setActiveProduct = function(index) {
    this.setState({ activeProductIndex: index });
    this.setState({ activeProductName: this.state.productsList[index].name });
    this.setState({
      activeProductCategory: this.state.productsList[index].category
    });
    if (this.props.changeActiveIndex) {
      this.props.changeActiveIndex(index);
    }
  };

  onProductItemClick = function(index, event) {
    this.setActiveProduct(index);
  };

  componentWillMount() {
    this.setState({ activeProductName: this.state.productsList[0].name });
    this.setState({
      activeProductCategory: this.state.productsList[0].category
    });
  }
  componentWillUpdate(nextProps, nextState) {}
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.activeIndex === this.state.activeProductIndex) {
      return true;
    } else {
      // Math.fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };
      // var raw_diff = nextState.activeProductIndex > this.state.activeProductIndex ? nextState.activeProductIndex - this.state.activeProductIndex : this.state.activeProductIndex - nextState.activeProductIndex;
      // var mod_diff = Math.fmod(raw_diff, this.state.productsList.length);
      // var dist = mod_diff > this.state.productsList.length/2 ? this.state.productsList.length - mod_diff : mod_diff;
      // // console.log("distance:", dist)
      // console.log({raw_diff, mod_diff, dist})

      this.setActiveProduct(nextProps.activeIndex);
      return false;
    }
  }
  render() {
    const { width, height } = this.state.dimensions;
    // let deg = this.state.activeProductIndex/this.state.productsList.length * 360 > 180 ? (360 - this.state.activeProductIndex/this.state.productsList.length * 360) * -1 : this.state.activeProductIndex/this.state.productsList.length * 360;
    // console.log(deg);
    let deg =
      this.state.activeProductIndex / this.state.productsList.length * 360 - 90;
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className="productCircle"
            style={{ height: width }}
          >
            {this.state.productsList.map((item, index) => (
              <Circle
                key={index}
                width={width}
                index={index}
                active={this.state.activeProductIndex}
                numberOfItems={this.state.productsList.length}
                selectProduct={this.onProductItemClick.bind(this, index)}
              >
                <ProductCircleImage product={item} />
              </Circle>
            ))}

            <ProductCircleName
              name={this.state.activeProductName}
              category={this.state.activeProductCategory}
            />
            <ProductCircleHand deg={deg} />
          </div>
        )}
      </Measure>
    );
  }
}

ProductCircle.propTypes = {
  alignment: PropTypes.string,
  label: PropTypes.string
};

ProductCircle.defaultProps = {
  alignment: 'left',
  label: '1982'
};

export default ProductCircle;
