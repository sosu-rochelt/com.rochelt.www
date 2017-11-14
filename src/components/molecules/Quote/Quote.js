import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import Measure from 'react-measure';

import styles from './Quote.scss';

import Divider from '../../atoms/Divider';
import FullsizeImage from '../../atoms/FullsizeImage';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
class Quote extends React.Component {
  // const Quote = ({quote, mode, ...otherProps }) => {
  state = {
    dimensions: {
      width: -1,
      height: -1
    },
    image: null
  };

  checkSupport(property) {
    if (typeof CSS !== 'undefined' && CSS !== undefined) {
      return CSS.supports(`(${property})`);
    }
    return false;
  }

  render() {
    const { width, height } = this.state.dimensions;
    const { quote, mode, variant = [] } = this.props;

    return (
      <Measure
        bounds
        onResize={contentRect => {
          let height =
            contentRect.bounds.height * (window.devicePixelRatio || 1);
          let width = contentRect.bounds.width * (window.devicePixelRatio || 1);

          this.setState({
            image: `http://res.cloudinary.com/dsnumegmn/image/fetch/h_${height -
              height % 100 +
              100},w_${width -
              width % 100 +
              100},c_limit,g_center,f_auto/${quote.image}`
          });
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className={cx({
              quote: true,
              'quote--dark': mode === 'dark' ? true : false,
              'quote--light': mode === 'light' ? true : false,
              'quote--advanced': this.checkSupport('shape-margin: 1px')
            })}
            style={{
              backgroundImage: this.state.image
                ? `url(${this.state.image})`
                : 'none'
            }}
          >
            {variant.indexOf('with-divider') !== -1 &&
            variant.indexOf('divider-at-top') !== -1 ? (
              <Divider variant={['small', 'no-top-margin', 'light']} />
            ) : (
              ''
            )}
            <div className="quote-textwrapper" style={{ height }}>
              <div className="quote-text">
                <span className="shape" />
                <Measure
                  bounds
                  onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds });
                  }}
                >
                  {({ measureRef }) => (
                    <div ref={measureRef}>
                      <p>
                        <span>„{quote.copy}“</span>
                      </p>
                    </div>
                  )}
                </Measure>
              </div>

              <div
                className="quote-author"
                style={{
                  right: height / 2
                }}
              >
                <div
                  className="quote-line"
                  style={{ height: height * 1.5, width: height * 1.5 }}
                />
                {quote.author}
              </div>
            </div>
            {variant.indexOf('with-divider') !== -1 &&
            variant.indexOf('divider-at-top') === -1 ? (
              <Divider variant={['small', 'no-bottom-margin', 'light']} />
            ) : (
              ''
            )}
          </div>
        )}
      </Measure>
    );
  }
}

Quote.propTypes = {
  mode: PropTypes.string
};

Quote.defaultProps = {
  mode: 'dark'
};
export default Quote;
