import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';

import { scroller } from 'react-scroll';

import cx from 'classnames';

import Heading from '../../atoms/Heading';
import Icon from '../../atoms/Icon';

import styles from './ContentToggle.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const ContentToggle = ({
  items,
  label,
  id,
  children,
  shouldScroll,
  ...otherProps
}) => {
  let textInput;

  const toggleSelect = function(e) {
    e.preventDefault();
    if (textInput.checked === true) {
      textInput.checked = false;
    } else {
      textInput.checked = true;
    }
    setTimeout(function() {
      const scrollTo = name => {
        scroller.scrollTo(name, {
          duration: 1500.1,
          delay: 100,
          smooth: true,
          offset: -50
        });
      };

      scrollTo('vendors');
    }, 500);
  };

  return (
    <div className="contentToggle">
      <input
        type="radio"
        name="contentToggle-toggle"
        ref={input => {
          textInput = input;
        }}
        id={id}
      />
      <label htmlFor={id} className="contentToggle-label">
        <Heading
          element="h4"
          onClick={e => {
            toggleSelect(e);
          }}
        >
          {label}
          <Icon name="arrowDown" size="10px" colorName="grey" />
        </Heading>
      </label>

      <div className="contentToggle-content">{children}</div>
    </div>
  );
};

ContentToggle.propTypes = {
  items: PropTypes.array
};

ContentToggle.defaultProps = {};
export default ContentToggle;
