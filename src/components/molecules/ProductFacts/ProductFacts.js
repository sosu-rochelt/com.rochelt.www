import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'
import styles from './ProductFacts.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const ProductFacts = ({facts, ...otherProps }) => {
  let factList;
  
  if (facts !== null) {
    factList = facts.map(function  (fact, index) {
      return <li className="productFacts_fact" key={"productFacts" + index}>{fact}</li>
    })
  }

  return (
    <ul
        className={cx({
        'productFacts': true
      })}
        {...otherProps}
      >
      {factList}
    </ul>
)}

ProductFacts.propTypes = {
    facts: PropTypes.array
}

ProductFacts.defaultProps = {
};
export default ProductFacts
