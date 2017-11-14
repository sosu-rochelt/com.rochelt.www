/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }]*/
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './Hamburger.scss';

import * as AppActions from '../../../actions/AppActions';
import AppStore from '../../../store/AppStore';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
class Hamburger extends React.Component {
  constructor() {
    super();
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
    return (
      <div
        className={cx({
          hamburger: true,
          'hamburger--active': this.state.config.navigation.isActive
        })}
        onClick={() => {
          AppStore.config.navigation.isActive
            ? AppActions.hideNav()
            : AppActions.showNav();
        }}
      >
        <span />
        <span />
      </div>
    );
  }
}

Hamburger.propTypes = {
  noBottomMargin: PropTypes.bool,
  noTopMargin: PropTypes.bool,
  light: PropTypes.bool,

  variant: PropTypes.array
};

Hamburger.defaultProps = {};
export default Hamburger;
