/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }]*/

import React from 'react'
import PropTypes from 'prop-types';
import Svg from "react-svg-inline"
import cx from 'classnames'


import styles from './Icon.scss'
const requireSVGs = require.context("./svg", false, /\.svg$/);

/**
 * General Icon Component
 *
 * takes of sizing, colorizing and loading whatever SVG is found in this components `./svg folder`
 * 
 * @param  {String} className
 * @param  {String} name
 * @param  {Number} size
 * @param  {String} colorName
 * @param  {Object} …
 * @return {Object}
 */

const Icon = ({name, size, colorName, ...otherProps }) => {
    const icon = requireSVGs(`./${name}.svg`);

    return (<div
              style={{
                width: /^\d+$/.test(size) ? size + 'px' : size
              }}
              className={`icon icon--${colorName} icon--${name}`}

            >
              <Svg svg={ icon } cleanup />
            </div>)
}

Icon.propTypes = {
  /** actual name of the icon, will be used as reference for the filename `name.svg` */
  name: PropTypes.string,
  /** predefined colorization of icons, values: `white, red, black, teal, salmon, grey` */
  colorName: PropTypes.string,
  /** width of displayed icon, should be dividable by 8 eg. 16, 64, 128, … */
  size: PropTypes.string
}

Icon.defaultProps = {
  name: 'logo',
  size: '128px',
  colorName: 'teal'
};

export default Icon
