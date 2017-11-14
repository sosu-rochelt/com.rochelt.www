import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import map from 'lodash/map';
import { scroller } from 'react-scroll';

// import { Link } from 'react-router'

import * as AppActions from '../../../actions/AppActions';
import AppStore from '../../../store/AppStore';

import cx from 'classnames';
import Icon from '../../atoms/Icon';

import styles from './NavigationBlock.scss';

// var scroller = Scroll.scroller;

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

class NavigationBlock extends React.Component {
  state = {
    navHidden: false,
    navigationFocus: AppStore
  };

  constructor(props) {
    super(props);
    if (!this.props.products) {
      // alert('no product data loaded')
    }

    this.state = {
      config: AppStore.getConfig()
    };
  }

  componentWillMount() {
    AppStore.on('change', () => {
      this.setState({
        config: AppStore.getConfig()
      });
    });
  }
  render() {
    const scrollTo = name => {
      scroller.scrollTo(name, {
        duration: 1500.1,
        delay: 100,
        smooth: true,
        offset: -50
      });
    };

    const bookmarks = item => {
      return map(
        item.bookmarks,
        function(bookmark, index) {
          return bookmark.text !== null ? (
            <div
              onClick={e => {
                scrollTo(bookmark.src);
              }}
              key={`bookmark_${index}`}
              className={cx({
                navigationBlock__bookmark: true,
                'navigationBlock__bookmark--active':
                  this.state.config.navigation.currentSubnav === bookmark.src
              })}
            >
              {bookmark.text}
            </div>
          ) : (
            ''
          );
        }.bind(this)
      );
    };
    const navigationItems = map(
      this.props.navigationStructure,
      function(item, index) {
        return (
          <li
            className="navigationBlock__listItem"
            key={`navigationBlock__listItem_${index}`}
            onClick={() => {
              AppActions.hideNav();
            }}
            onMouseOver={() => {
              if (item.path === this.state.config.navigation.currentPage) {
                AppActions.toggleSubnav(true);
              } else {
                AppActions.toggleSubnav(false);
              }
            }}
          >
            <Link
              to={item.path}
              className="navigationBlock__link"
              activeClassName="navigationBlock__link--active"
            >
              {item.name}
            </Link>
            {this.state.config.navigation.showSubnav ? bookmarks(item) : ''}
          </li>
        );
      }.bind(this),
      this
    );

    let style = this.props.adaptHeight
      ? {
          maxHeight: 296 - 30 - this.state.config.navigation.scrollPosition,
          overflow: 'hidden'
        }
      : {};

    return (
      <div
        className={cx({
          navigationBlock: true,
          'navigationBlock--dark':
            this.props.dark || this.state.config.navigation.isActive,
          'navigationBlock--active': this.state.config.navigation.isActive
        })}
        style={style}
        onMouseOver={() => {}}
        onMouseLeave={() => {
          AppActions.hideNav();
        }}
      >
        {/* {this.state.config.navigation.scrollPosition} */}
        <div className="navigationBlock__wrapper">
          <Link to="/" className="navigationBlock__home">
            <Icon
              name="logo"
              colorName={
                this.props.dark || this.state.config.navigation.isActive ? (
                  'grey'
                ) : (
                  'white'
                )
              }
            />
          </Link>

          <ul
            className={cx({
              navigationBlock__list: true,
              'navigationBlock__list--hidden': this.state.navHidden
            })}
          >
            {navigationItems}
          </ul>
        </div>
      </div>
    );
  }
}

NavigationBlock.propTypes = {
  dark: PropTypes.bool
};

NavigationBlock.defaultProps = {
  dark: false
};
export default NavigationBlock;
