import React from 'react';
import PropTypes from 'prop-types';
// import Link from "gatsby-link"import Waypoint from 'react-waypoint';
import Markdown from 'react-remarkable';
import Slick from 'react-slick';
import Measure from 'react-measure';

import { Link } from 'react-router';

import cx from 'classnames';
import Image from '../../atoms/Image';

import styles from './InfoGraphicSlider.scss';
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
class InfoGraphicSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      dimensions: {
        width: -1,
        height: -1
      }
    };
  }

  infoContainer(index, infoItems, background) {
    if (index !== null) {
      const info = infoItems[index];
      let wrappedInfo = (
        <div
          className={cx({
            info: true
          })}
          style={{}}
        >
          <div
            className="info-image"
            style={{
              backgroundImage: `url(${info.image})`
            }}
          >
            <Image src={background} variant={[]} />
          </div>
          <div className="info-text">
            <Markdown options={{ breaks: true }}>{info.copy}</Markdown>
          </div>
        </div>
      );
      return wrappedInfo;
    }
  }

  render() {
    var settings = {
      arrows: false,
      dots: false,
      infinite: true,
      draggable: false,
      speed: 0,
      fade: true,
      autoplay: false,
      autoplaySpeed: 5000,
      adaptiveHeight: false,
      slickGoTo: 1,
      beforeChange: (prevIndex, nextIndex) => {
        this.setState({
          activeIndex: nextIndex
        });
      }
    };
    return (
      <div
        className={cx({
          infoGraphicSlider: true
        })}
      >
        <div style={{}} className="infoGraphicSlider-wrapper">
          <Slick
            ref="slider"
            className={cx({
              slider: true
            })}
            {...settings}
          >
            {this.props.items.map((item, index) => {
              return (
                <div key={`infoGraphicSlider-${index}`}>
                  {this.infoContainer(
                    index,
                    this.props.items,
                    this.props.background
                  )}
                </div>
              );
            })}
          </Slick>

          <div
            className={cx({
              infoGraphicSlider_dots: true
            })}
            style={{ top: this.state.dimensions.height }}
          >
            {this.props.items.map((item, index) => (
              <div
                key={`infoGraphicSlider_dot-${index}`}
                className={cx({
                  infoGraphicSlider_dot: true,
                  'infoGraphicSlider_dot--active':
                    this.state.activeIndex === index
                })}
                onClick={e => {
                  this.refs.slider.innerSlider.slickGoTo(index);
                }}
              />
            ))}
          </div>
          <div className="infoGraphicSlider_background">
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({
                  dimensions: contentRect.bounds
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
        </div>
      </div>
    );
  }
}

InfoGraphicSlider.propTypes = {
  background: PropTypes.string,
  overlay: PropTypes.string
};

InfoGraphicSlider.defaultProps = {};
export default InfoGraphicSlider;
