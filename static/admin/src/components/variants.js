import React from 'react'
import PropTypes from 'prop-types';

// class ProductOverview extends React.Component {
//   state = {
//     activeIndex: 0
//   }

//   constructor(props) {
//     super(props)
//     this.changeHandler = this.changeHandler.bind(this)
//     this.onChange = this.onChange.bind(this)
//   }

//   changeHandler(index) {
//     console.log('change was called', index)
//     this.setState({activeIndex: index});
//   }

//   onChange(currentSlide , nextSlide) {
//     console.log(currentSlide, nextSlide)
//   }

//   render(){
//     return (
//         <div className={cx({
//             productOverview: true
//         })}>
//             <div>
//                 <ProductCircle changeActiveIndex={index => this.changeHandler(index)} products={this.props.products} activeIndex={this.state.activeIndex}/>
//             </div>
//             <hr/>
//             <ProductSlider activeIndex={this.state.activeIndex} changeActiveIndex={event => this.changeHandler(event)} products={this.props.products} />
//         </div>
//     )
//   }
    
// }

// ProductOverview.propTypes = {
// }

// ProductOverview.defaultProps = {
//   colorOverride: 'none'
// };
// export default ProductOverview




const CategoriesControl = ({ className, element, colorOverride, children, variant, ...otherProps }) => (
      <p>lorem</p>
)
// var CategoriesControl = createClass({
//   handleChange: function(e) {
//     this.props.onChange(e.target.value.split(',').map((e) => e.trim()));
//   },

//   render: function() {
//     var value = this.props.value;
//     return h('input', { type: 'text', value: value ? value.join(', ') : '', onChange: this.handleChange });
//   }
// });

var CategoriesPreview = createClass({
  render: function() {
    return h('ul', {},
      this.props.value.map(function(val, index) {
        return h('li', {key: index}, val);
      })
    );
  }
});

CMS.registerWidget('variants', CategoriesControl, CategoriesPreview);