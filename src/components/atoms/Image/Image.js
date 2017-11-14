import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './Image.scss';

import Divider from '../Divider';
import ResponsiveImage from '../ResponsiveImage';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const Image = ({ className, src, variant, ...otherProps }) => {
  let image = <ResponsiveImage src={src} relativeWidth={100} />;
  if (variant.indexOf('skipCDN') !== -1) {
    image = <img src={src} />;
  }
  return (
    <div
      className={cx({
        image: true,
        'image--with-divider': variant.indexOf('with-divider') !== -1
      })}
      {...otherProps}
    >
      {image}
      {variant.indexOf('with-divider') !== -1 ? (
        <Divider variant={['small', 'no-bottom-margin', 'light']} />
      ) : (
        ''
      )}
    </div>
  );
};

Image.PropTypes = {
  src: PropTypes.string.required,
  className: PropTypes.string,
  variant: PropTypes.bool
};

Image.defaultProps = {
  variant: ''
};
export default Image;
