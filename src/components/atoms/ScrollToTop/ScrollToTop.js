import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'
import Icon from '../Icon'

import styles from './ScrollToTop.scss'

/**
 Arrows used for several components, eg. `Slider`
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

const scrollTo = function(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 2;
    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 2);
    }, 10);
}


const ScrollToTop = ({ ...otherProps }) => (
    <div
        role="scrollToTop"
        className="scrollToTop"
        onClick={() => {scrollTo(document.body, 0, 50)}}
        {...otherProps}
    >   
      <Icon name="toTop" colorName="grey" size="24px"/>

    </div>
)

ScrollToTop.propTypes = {
}

ScrollToTop.defaultProps = {
};
export default ScrollToTop
