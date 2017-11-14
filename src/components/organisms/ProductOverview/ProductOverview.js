import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './ProductOverview.scss';

import ProductSlider from '../ProductSlider';
import ProductsTOC from '../ProductsTOC';
import ProductCircle from '../../molecules/ProductCircle';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
class ProductOverview extends React.Component {
	state = {
		activeIndex: 0
	};

	constructor(props) {
		super(props);
		this.changeHandler = this.changeHandler.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	changeHandler(index) {
		console.log('change was called', index);
		this.setState({ activeIndex: index });
	}

	onChange(currentSlide, nextSlide) {
		console.log(currentSlide, nextSlide);
	}

	render() {
		return (
			<div
				className={cx({
					productOverview: true
				})}
			>
				<div>
					<ProductCircle
						changeActiveIndex={index => this.changeHandler(index)}
						products={this.props.products}
						activeIndex={this.state.activeIndex}
					/>
				</div>
				<hr />
				<ProductsTOC
					activeIndex={this.state.activeIndex}
					changeActiveIndex={event => this.changeHandler(event)}
					products={this.props.products}
				/>

				<ProductSlider
					name={'ProductSlider'}
					activeIndex={this.state.activeIndex}
					changeActiveIndex={event => this.changeHandler(event)}
					products={this.props.products}
				/>
			</div>
		);
	}
}

ProductOverview.propTypes = {};

ProductOverview.defaultProps = {
	colorOverride: 'none'
};
export default ProductOverview;
