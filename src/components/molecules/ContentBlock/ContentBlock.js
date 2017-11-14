import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './ContentBlock.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const ContentBlock = ({ className, element, colorOverride, ...otherProps }) => (
    <div
        style={{color: colorOverride}}
        role="contentBlock"
        className={cx({
        'contentBlock': true,
        [`contentBlock--${element}`]: element
      })}
        {...otherProps}
    >
    </div>
)

ContentBlock.PropTypes = {
    element: PropTypes.string.required,
    className: PropTypes.string,
    children: PropTypes.node,
    colorOverride: PropTypes.string,
}

ContentBlock.defaultProps = {
  colorOverride: 'none'
};
export default ContentBlock
