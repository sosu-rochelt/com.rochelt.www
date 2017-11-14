import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './Title.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

const Title = ({ title, subline, ...otherProps }) => (
    <div className="title">
      <span className="title-main">
        <span className="title-main-text">{title}</span>
      </span>
      <span className="title-subline">
         {subline}
      </span>
    </div>
)

Title.PropTypes = {
    title: PropTypes.string.required,
    subline: PropTypes.string
}

Title.defaultProps = {
  title: 'none'
};

export default Title
