import React from 'react'
import PropTypes from 'prop-types';
// import Link from "gatsby-link"

import { Link } from 'react-router'

import cx from 'classnames'
import Icon from '../../atoms/Icon'

import styles from './TimelineElement.scss'
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const TimelineElement = ({alignment, label, type, children, ...otherProps }) => {
  const divider = <Icon name="divider" size="24" colorName="grey"/>
  return <div
            className={
              cx({
                'timelineElement': true,
                [`timelineElement--${alignment}`]: true,
                [`timelineElement--${type}`]: true,
              })
            }
            {...otherProps}
          >
            {type === "default" ? <div className="timelineElement-label"><span className="timelineElement-labelText">{label}</span></div>  : ''}
            <div className="timelineElement-content">
              {children}
            </div>

            {type === "divider" ? divider : ''}
          </div>
}

TimelineElement.propTypes = {
    alignment: PropTypes.string, 
    label: PropTypes.string,
    type: PropTypes.string
}

TimelineElement.defaultProps = {
  alignment: 'left', 
  label: '1982',
  type: 'default'
};
export default TimelineElement
