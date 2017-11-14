/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }]*/
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './Divider.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const Divider = ({
  variant,
  noTopMargin,
  noBottomMargin,
  light,
  ...otherProps
}) => {
  return (
    <hr
      className={cx({
        divider: true,
        ['divider--small']: variant.indexOf('small') !== -1,
        ['divider--no-top-margin']: variant.indexOf('no-top-margin') !== -1,
        ['divider--no-bottom-margin']:
          variant.indexOf('no-bottom-margin') !== -1,
        ['divider--light']: variant.indexOf('light') !== -1,
        ['divider--dark']: variant.indexOf('dark') !== -1
      })}
      {...otherProps}
    />
  );
};

Divider.propTypes = {
  noBottomMargin: PropTypes.bool,
  noTopMargin: PropTypes.bool,
  light: PropTypes.bool,

  variant: PropTypes.array
};

Divider.defaultProps = {};
export default Divider;
