var React = require('react');
var Reflux = require('reflux');
var ProductActions = require('../actions/ProductActions.js');
var ProductsStore = require('../store/ProductsStore.js');

var Products = require('./products/ProductsView.jsx');
var CartItems = require('./cart/CartBar.jsx');
var Menu = require('./menu/MenuView.jsx');


const App = React.createClass({
	mixins: [Reflux.connect(ProductsStore,"products")],

	getInitialState(){
		return {
			products: []
		}
	},

	render() {
		return (
			<div className="row">
				<Menu/>
				<div className="col-xs-12 col-md-8"> 
					{this.props.children || <Products products={this.state.products} />}
				</div>
				<div className="col-xs-12 col-md-4">
					<div id="cartitems">
						<CartItems />
					</div>
				</div>
			</div>
		)
	}
})


module.exports = App;