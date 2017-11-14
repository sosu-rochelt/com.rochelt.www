import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';

import cx from 'classnames';

import Heading from '../../atoms/Heading';
import Icon from '../../atoms/Icon';

import ContentToggle from '../../atoms/ContentToggle';

import styles from './Vendors.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

const Vendors = ({ items, label, id, ...otherProps }) => {
  let vendors;
  let textInput;
  if (items !== null) {
    vendors = items.map(function(vendor, index) {
      return (
        <li className="vendor" key={'vendor' + index}>
          <Markdown options={{ breaks: true, linkify: true }}>
            {vendor.copy}
          </Markdown>
        </li>
      );
    });
  }

  return (
    <div
      className={cx({
        vendors: true
      })}
    >
      <ContentToggle label={label} id={id}>
        <ul
          className={cx({
            'vendor-list': true
          })}
          {...otherProps}
        >
          {vendors}
        </ul>
      </ContentToggle>
    </div>
  );
};

Vendors.propTypes = {
  items: PropTypes.array
};

Vendors.defaultProps = {};
export default Vendors;
