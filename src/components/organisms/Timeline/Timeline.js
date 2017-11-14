import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './Timeline.scss'
import NavigationBlock from '../../molecules/TimelineElement'


/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const Timeline = ({ className, colorOverride, ...otherProps }) => (
    <div
        style={{color: colorOverride}}
        className={cx({
        'timeline': true,
      })}
        {...otherProps}
    >
        
    </div>
)

Timeline.propTypes = {
    className: PropTypes.string,
    colorOverride: PropTypes.string,
}

Timeline.defaultProps = {
  colorOverride: 'none'
};
export default Timeline
