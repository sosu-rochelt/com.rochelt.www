import cx from 'classnames';
import Markdown from 'react-remarkable';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Copy.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

const Copy = ({ children, ...otherProps }) => (
  <div className="copy">
    <Markdown options={{ breaks: true, linkTarget: '_blank' }} className="copy">
      {children}
    </Markdown>
  </div>
);

Copy.PropTypes = {};

Copy.defaultProps = {
  title: 'none'
};

export default Copy;
