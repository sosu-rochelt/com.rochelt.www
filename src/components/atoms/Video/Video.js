import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import Waypoint from 'react-waypoint';

import styles from './Video.scss';

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
const Video = ({ poster, src, variant, ...otherProps }) => {
  return (
    <div
      className={cx({
        video: true,
        'video--with-divider': variant.indexOf('with-divider') !== -1
      })}
    >
      <Waypoint
        onEnter={() => {
          console.log('enter');
        }}
        onLeave={() => {
          console.log('leave');
        }}
      >
        <video
          preload="auto"
          autoPlay="autoplay"
          loop="loop"
          poster={poster}
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      </Waypoint>
    </div>
  );
};

Video.PropTypes = {
  src: PropTypes.string.required,
  className: PropTypes.string,
  variant: PropTypes.bool
};

Video.defaultProps = {
  variant: ''
};
export default Video;
