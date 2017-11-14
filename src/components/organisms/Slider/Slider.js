import React from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Arrow from '../../atoms/Arrow';
import Heading from '../../atoms/Heading';
import Image from '../../atoms/Image';
import styles from './Slider.scss';

var settings = {
  arrows: true,
  dots: false,
  infinite: true,
  draggable: false,
  autoplay: true,
  autoplaySpeed: 2500,
  adaptiveHeight: false,
  fade: true,
  slide: false,
  slickGoTo: 1,
  nextArrow: <Arrow className="slider-right" direction="right" size="20px" />,
  prevArrow: <Arrow className="slider-left" direction="left" size="20px" />
};
// {children}

const Slider = ({
  className,
  element,
  colorOverride,
  children,
  variant,
  ...otherProps
}) => {
  Object.assign(settings, {
    autoplay: !(variant.indexOf('no-autoplay') !== -1)
  });

  return (
    <Slick
      className={cx({
        slider: true,
        'slider-text-below': variant === 'text-below' ? true : false
      })}
      {...settings}
    >
      {children}
    </Slick>
  );
};

export default Slider;
