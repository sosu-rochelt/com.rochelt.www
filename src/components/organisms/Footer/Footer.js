import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './Footer.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const Footer = ({ className, element, colorOverride, ...otherProps }) => (
	<div
		style={{ color: colorOverride }}
		role="footer"
		className={cx({
			footer: true,
			[`footer--${element}`]: element
		})}
		{...otherProps}
	/>
);

Footer.PropTypes = {
	element: PropTypes.string.required,
	className: PropTypes.string,
	colorOverride: PropTypes.string
};

Footer.defaultProps = {
	colorOverride: 'none'
};
export default Footer;
