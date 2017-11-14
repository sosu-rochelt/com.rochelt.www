import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'
import styles from './Principles.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const ProductFacts = ({items, ...otherProps }) => {
  let principles;
  
  if (items !== null) {
    principles = items.map(function  (principle, index) {
      return (
              <li className="principle" key={"principle" + index}>
                <span className="principle__order">{index + 1}</span>
                {principle.copy}
              </li>
            )
    })
  }

  return (

    <div>
      <ul
          className={cx({
          'principles': true
        })}
          {...otherProps}
        >
        {principles}
      </ul>
    </div>
)}

ProductFacts.propTypes = {
    items: PropTypes.array
}

ProductFacts.defaultProps = {
};
export default ProductFacts
