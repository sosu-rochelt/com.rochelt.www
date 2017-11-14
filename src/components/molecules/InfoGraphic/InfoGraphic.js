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

import styles from './InfoGraphic.scss';

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
    this.state = {
      info: null
    };
  }

  handleMouseEnter(e) {
    console.log(e);
  }

  showInfo(index) {
    this.setState({ info: parseInt(index, 10) });
  }

  hideInfo() {
    this.setState({ info: null });
  }

  render() {
    const divider = <Icon name="divider" size="24" colorName="grey" />;

    return (
      <div
        className={cx({
          infoGraphic: true
        })}
      >
        <Image src={this.props.background} variant={[]} />

        <div className={'infoGraphic-overlay'} ref="overlay">
          <ReactSVG
            path={this.props.overlay}
            callback={svg => {
              Array.from(
                svg.querySelectorAll('[id^=toggle_] > path')
              ).forEach(button => {
                button.addEventListener(
                  'mouseenter',
                  event => {
                    console.log('in');
                    let infoIndex = event.target.parentNode
                      .getAttribute('id')
                      .split('toggle_')[1];
                    this.showInfo(infoIndex - 1);
                  },
                  false
                );
                button.addEventListener(
                  'mouseout',
                  event => {
                    console.log('out');
                    this.hideInfo();
                  },
                  false
                );
              });
            }}
          />
        </div>
        <div className="infoGraphic-infoWrapper">
          {this.props.items.map((item, index) => {
            const placement = item.type.split('-');
            return (
              <div
                key={`infoGraphic-info-${index}`}
                className={cx({
                  'infoGraphic-info': true,
                  'infoGraphic-info--hidden': this.state.info !== index,
                  'infoGraphic-info--middle':
                    placement[0] === 'middle' ? true : false,
                  'infoGraphic-info--top':
                    placement[0] === 'top' ? true : false,
                  'infoGraphic-info--left':
                    placement[1] === 'left' ? true : false,
                  'infoGraphic-info--bottom':
                    placement[0] === 'bottom' ? true : false,
                  'infoGraphic-info--right':
                    placement[1] === 'right' ? true : false
                })}
              >
                <Markdown options={{ breaks: true }}>{item.copy}</Markdown>
              </div>
            );
          })}
        </div>
        <div />
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
