import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'
import Icon from '../Icon'

import styles from './Arrow.scss'

/**
 Arrows used for several components, eg. `Slider`
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

const arrowIcon = (direction, size) => {
  switch (direction) {
      case 'up':
          return <Icon name="arrowUp" colorName="grey" size={size}/>
          break;
      case 'right':
          return <Icon name="arrowRight" colorName="grey" size={size}/>
          break;
      case 'down':
          return <Icon name="arrowDown" colorName="grey" size={size}/>
          break;
      case 'left':
          return <Icon name="arrowLeft" colorName="grey" size={size}/>
          break;
      default:
          return <Icon name="arrowLeft" colorName="grey" size={size}/>
          break;
  }
}
const Arrow = ({ className, direction, size, colorName, currentSlide, slideCount, ...otherProps }) => (
    <div
        role="arrow"
        className={className}
        {...otherProps}

    >   
        {currentSlide}
        {slideCount}
        {arrowIcon(direction, size)}        
    </div>
)

Arrow.propTypes = {
  /** actual name of the Arrow, will be used as reference for the filename `direction.svg` eg. `up, down, left, right` */
  direction: PropTypes.string.isRequired,
  /** width in pixels, width is referring to the artboard size, not neccessarily to icon size */
  size: PropTypes.string,
  /** setting the color using existing classes */
  colorName: PropTypes.string
}

Icon.defaultProps = {
  direction: 'left',
  size: '16px',
  colorName: 'black',
  className: ''
};
export default Arrow
