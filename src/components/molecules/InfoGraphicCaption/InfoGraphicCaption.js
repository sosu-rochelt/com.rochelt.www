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

import styles from './InfoGraphicCaption.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */

class InfoGraphicCaption extends React.Component {
  constructor() {
    super();
  }

  render() {
    const divider = <Icon name="divider" size="24" colorName="grey" />;

    return (
      <div
        className={cx({
          infoGraphicCaption: true
        })}
      >
        <Image src={this.props.background} variant={[]} />

        <div className={'infoGraphicCaption-overlay'} ref="overlay">
          {this.props.overlay !== null ? (
            <ReactSVG path={this.props.overlay} />
          ) : (
            ''
          )}
        </div>

        <div className="infoGraphicCaption-infoWrapper">
          {this.props.items.map((item, index) => {
            return (
              <div
                key={`infoGraphicCaption-info-${index}`}
                className={cx({
                  'infoGraphicCaption-info': true
                })}
              >
                <div
                  className={cx({
                    'infoGraphicCaption-number':
                      this.props.variant.indexOf('showCounter') !== -1
                        ? true
                        : false,
                    'infoGraphicCaption-icon':
                      this.props.variant.indexOf('showCounter') !== -1
                        ? false
                        : true
                  })}
                >
                  <span>
                    {this.props.variant.indexOf('showCounter') !== -1 ? (
                      index + 1
                    ) : (
                      'i'
                    )}{' '}
                  </span>
                </div>
                <div className="infoGraphicCaption-text">
                  <Markdown options={{ breaks: true }}>{item.copy}</Markdown>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

InfoGraphicCaption.propTypes = {
  background: PropTypes.string,
  overlay: PropTypes.string
};

InfoGraphicCaption.defaultProps = {};

export default InfoGraphicCaption;
