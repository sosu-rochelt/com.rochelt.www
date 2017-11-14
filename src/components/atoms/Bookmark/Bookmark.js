import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

import * as AppActions from '../../../actions/AppActions';
import AppStore from '../../../store/AppStore';

import Scroll from 'react-scroll';

import cx from 'classnames';

import styles from './Bookmark.scss';

var Element = Scroll.Element;
/**
 * Color used in the project
 */

class Bookmark extends React.Component {
  render() {
    return (
      <Element className="bookmark" name={this.props.name}>
        <Waypoint
          onEnter={() => {
            AppActions.updateCurrentSubnav(this.props.name);
          }}
          onLeave={() => {}}
        />
      </Element>
    );
  }
}
Bookmark.propTypes = {};

Bookmark.defaultProps = {};
export default Bookmark;
