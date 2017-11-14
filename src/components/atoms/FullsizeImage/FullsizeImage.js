/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }] */
import React from "react";
import PropTypes from "prop-types";

import cx from "classnames";

import ResponsiveImage from "../ResponsiveImage";

import styles from "./FullsizeImage.scss";

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const FullsizeImage = ({ type, src, video, children, ...otherProps }) => {
  const srcIsColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/gm.test(src);
  const background =
    type == "video" ? (
      <video
        autoPlay
        loop
        preload="auto"
        poster={`http://res.cloudinary.com/dsnumegmn/image/fetch/c_limit,w_1280,f_auto/${src}`}
        id="video-background"
        muted
        plays-inline
      >
        <source src={video} type="video/mp4" />
      </video>
    ) : (
      <ResponsiveImage src={src} relativeWidth={100} />
    );
  return (
    <div
      role="fullsizeImage"
      className={cx({
        fullsizeImage: true
      })}
      {...otherProps}
    >
      {srcIsColor ? "" : background}
      {children}
    </div>
  );
};

FullsizeImage.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};
export default FullsizeImage;
