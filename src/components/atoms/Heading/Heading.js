import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './Heading.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const Heading = ({ className, element, colorOverride, ...otherProps }) => (
    <div
        style={{color: colorOverride}}
        role="heading"
        className={cx({
        'heading': true,
        [`heading--${element}`]: element
      })}
        {...otherProps}
    >
    </div>
)

Heading.PropTypes = {
    element: PropTypes.string.required,
    className: PropTypes.string,
    children: PropTypes.node,
    colorOverride: PropTypes.string,
}

Heading.defaultProps = {
  colorOverride: 'none'
};
export default Heading
