import React from 'react';
import PropTypes from 'prop-types';
// import Link from "gatsby-link"
import Markdown from 'react-remarkable';
import map from 'lodash/map';
import { Link } from 'react-router';
import ReactSVG from 'react-svg';
import cx from 'classnames';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';

import styles from './InfoGraphicStatic.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

class InfoGraphic extends React.Component {
  // const InfoGraphic = ({ this.props.items, this.props.background, overlay, ...otherProps }) => {

  constructor() {
    super();
  }

  render() {
    return (
      <div
        className={cx({
          infoGraphicStatic: true
        })}
      >
        <Image src={this.props.background} variant={[]} />

        <div className={'infoGraphic-overlay'} ref="overlay">
          <ReactSVG path={this.props.overlay} />
        </div>
      </div>
    );
  }
}

InfoGraphic.propTypes = {
  background: PropTypes.string,
  overlay: PropTypes.string
};

InfoGraphic.defaultProps = {};
export default InfoGraphic;
