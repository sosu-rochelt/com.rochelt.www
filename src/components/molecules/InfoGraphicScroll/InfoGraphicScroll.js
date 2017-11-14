import React from 'react';
import PropTypes from 'prop-types';
// import Link from "gatsby-link"
import Waypoint from 'react-waypoint';
import Measure from 'react-measure';
import Markdown from 'react-remarkable';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { Link } from 'react-router';

import cx from 'classnames';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';

import styles from './InfoGraphicScroll.scss';
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
class InfoGraphicScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoIndexVisible: null,
      position: 'absolute',
      viewportHeight: 0,
      dimensions: {
        width: -1,
        height: -1
      }
    };
    this.setFixed.bind(this);
  }
  showInfo(index) {
    this.setState({
      infoIndexVisible: index
    });
  }
  hideInfo() {
    this.setState({
      infoIndexVisible: null
    });
  }

  infoContainer(index, infoItems) {
    if (index !== null) {
      const info = infoItems[index];
      let wrappedInfo = (
        <div
          className={cx({
            info: true,
            'info--visible': this.state.infoIndexVisible === index,
            'info--hidden': this.state.infoIndexVisible !== index,
            'info--reverse': info.type === 'reverse'
          })}
          style={{
            height: this.state.dimensions.height
          }}
        >
          <div
            className="info-image"
            style={{
              backgroundImage: `url(${info.image})`
            }}
          />
          <div className="info-text">
            <Markdown options={{ breaks: true }}>{info.copy}</Markdown>
          </div>
        </div>
      );
      return wrappedInfo;
    }
  }
  setFixed() {
    this.setState({
      style: {
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '0 30px'
      }
    });
  }

  setAbsolute(currentPosition) {
    this.setState({
      style: {
        position: 'absolute',
        top: currentPosition === 'below' ? 0 : 'auto',
        bottom: currentPosition === 'above' ? 0 : 'auto'
      }
    });
  }
  render() {
    return (
      <div
        className={cx({
          infoGraphicScroll: true
        })}
      >
        <Waypoint
          bottomOffset={
            this.state.viewportHeight / 2 + this.state.dimensions.height / 2
          }
          topOffset={0}
          onEnter={() => {
            this.setFixed();
          }}
          onLeave={(previousPosition, currentPosition, event) => {
            if (previousPosition.currentPosition === 'below') {
              this.setAbsolute('below');
            }
          }}
        />
        <div
          style={{
            height:
              (200 * this.props.items.length + 150 + 50).toString(10) + 'vh',
            position: 'relative'
          }}
          className="infoGraphicScroll-wrapper"
        >
          <div style={this.state.style}>
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({
                  dimensions: contentRect.bounds,
                  viewportHeight: window.innerHeight
                });
              }}
            >
              {({ measureRef }) => (
                <div ref={measureRef}>
                  <Image src={this.props.background} variant={[]} />
                </div>
              )}
            </Measure>
          </div>
          <CSSTransitionGroup
            transitionName="appear"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {this.infoContainer(this.state.infoIndexVisible, this.props.items)}
          </CSSTransitionGroup>

          <div className="info_helper">
            {this.props.items.map((info, index) => (
              <Waypoint
                bottomOffset={0}
                topOffset={'50%'}
                onEnter={() => {
                  this.showInfo(index);
                }}
                onLeave={() => {
                  this.hideInfo();
                }}
                key={`infoHelper_${index}`}
              >
                <div
                  style={{
                    height: '10%',
                    width: '20%'
                  }}
                />
              </Waypoint>
            ))}
          </div>
        </div>
        <Waypoint
          topOffset={
            this.state.viewportHeight / 2 + this.state.dimensions.height / 2
          }
          bottomOffset={0}
          onEnter={() => {
            this.setFixed();
          }}
          onLeave={(previousPosition, currentPosition, event) => {
            if (previousPosition.currentPosition === 'above') {
              this.setAbsolute('above');
              this.hideInfo();
            }
          }}
        />
      </div>
    );
  }
}

InfoGraphicScroll.propTypes = {
  background: PropTypes.string,
  overlay: PropTypes.string
};

InfoGraphicScroll.defaultProps = {};
export default InfoGraphicScroll;
