import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Markdown from 'react-remarkable';

import AppStore from '../../../store/AppStore';
import * as AppActions from '../../../actions/AppActions';

import Icon from '../../atoms/Icon';
import Heading from '../../atoms/Heading';

import ProductFacts from '../../molecules/ProductFacts';

import styles from './ProductInfo.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTab: AppStore.getConfig().displayTab
    };

    this.item = this.props.item;
    this.index = this.props.index;
  }

  enableTab(index) {
    // this.setState({ displayTab: index });
    AppActions.displayTab(index);
  }

  componentWillMount() {
    AppStore.on('change', () => {
      if (this.state.displayTab !== AppStore.getConfig().displayTab) {
        this.setState({
          displayTab: AppStore.getConfig().displayTab
        });
      }
    });
  }

  componentDidMount() {
    this.setState({
      displayTab: 0
    });
  }
  render() {
    return (
      <div className="productInfo ">
        <div
          className={cx({
            'productInfo-text': true,
            'productInfo--active': this.state.displayTab === 0
          })}
        >
          <Heading element="h1">{this.item.name}</Heading>
          <div dangerouslySetInnerHTML={{ __html: this.item.node.html }} />
        </div>

        <div
          className={cx({
            'productInfo-tasting': true,
            'productInfo--active': this.state.displayTab === 1
          })}
        >
          <Heading element="h1">{this.item.name}</Heading>
          <Markdown>{this.item.tasting}</Markdown>
        </div>

        <ProductFacts facts={this.item.facts} />
        {this.state.displayTab === 1 ? (
          <label
            className="productInfo-label"
            onClick={() => this.enableTab(0)}
          >
            <Heading element="h4">
              Sortenbeschreibung
              <Icon name="arrowUp" size="14px" colorName="grey" />
            </Heading>
          </label>
        ) : (
          <label
            className="productInfo-label"
            onClick={() => this.enableTab(1)}
          >
            <Heading element="h4">
              Verkostungsnotiz
              <Icon name="arrowUp" size="14px" colorName="grey" />
            </Heading>
          </label>
        )}
      </div>
    );
  }
}
ProductInfo.propTypes = {
  facts: PropTypes.array
};

ProductInfo.defaultProps = {};
export default ProductInfo;
