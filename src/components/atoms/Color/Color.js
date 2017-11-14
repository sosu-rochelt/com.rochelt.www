import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './Color.scss'

/**
 * Color used in the project
 */

const Color = ({ modifier, ...otherProps }) => (
    <div className={cx(
    	{
    	'color': true, 
    	[`color--${modifier}`]: true})}
    	{...otherProps}>
    	<div className="color-box"></div>
    	<div className="color-name">{modifier}</div>
    </div>
)

Color.propTypes = {
	/** name of variable in sass*/
    modifier: PropTypes.string
}

Color.defaultProps = {
	modifier: 'primaryColor'
};
export default Color
