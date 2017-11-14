/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }]*/
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './ResponsiveImage.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

const ResponsiveImage = ({ src, alt, relativeWidth, ...otherProps }) => {
  const inDebugMode = false;
  let debugImages = function(size) {
    return `/l_text:Arial_25_bold:${size},co_grey,g_south_east,x_5,y_5`;
  };
  let sizes = [
    320,
    480,
    620,
    736,
    853,
    898,
    1265,
    1263,
    1352,
    1442,
    1524,
    1610,
    1691,
    2400,
    1280
  ];
  const isSVG = searchString => {
    const regex = /\w+.svg$/;
    return regex.test(searchString);
  };
  const pathIsRelative = searchString => {
    const regex = /^((http|https):\/\/)/;
    return !regex.test(searchString);
  };
  const generateSrcSet = src => {
    return sizes
      .map(function(size, index) {
        return `http://res.cloudinary.com/dsnumegmn/image/fetch/c_limit,w_${size},f_auto${false
          ? debugImages(size)
          : ''}/${src} ${size}w`;
      }, this)
      .join(',');
  };

  const generateSrc = src => {
    return `http://res.cloudinary.com/dsnumegmn/image/fetch/c_limit,w_1280,f_auto${false
      ? debugImages(1280)
      : ''}/${src}`;
  };

  return (
    <div className="responsiveImage">
      <img
        sizes={`(max-width: 6000px) ${relativeWidth}vw, 2400px`}
        srcSet={isSVG(src) || pathIsRelative(src) ? '' : generateSrcSet(src)}
        src={isSVG(src) || pathIsRelative(src) ? src : generateSrc(src)}
        alt={src}
      />
    </div>
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string,
  relativeWidth: PropTypes.number
};

ResponsiveImage.defaultProps = {
  relativeWidth: '100'
};
export default ResponsiveImage;
