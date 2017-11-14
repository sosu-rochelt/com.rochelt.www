import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './IntroBlock.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const IntroBlock = ({children, ...otherProps }) => (
    <div
        className={cx({
        'introBlock': true
      })}
        {...otherProps}
    >
		<div className="introBlock-wrapper">
	        <div className="content">{children}</div>
		</div>
    </div>
)

IntroBlock.propTypes = {
    children: PropTypes.node
}

IntroBlock.defaultProps = {
};
export default IntroBlock
