import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './Address.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const Address = ({ className, element, colorOverride, ...otherProps }) => (
    <div
        style={{color: colorOverride}}
        role="address"
        className={cx({
        'address': true,
        [`address--${element}`]: element
      })}
        {...otherProps}
    >
    </div>
)

Address.PropTypes = {
    element: PropTypes.string.required,
    className: PropTypes.string,
    children: PropTypes.node,
    colorOverride: PropTypes.string,
}

Address.defaultProps = {
  colorOverride: 'none'
};
export default Address
