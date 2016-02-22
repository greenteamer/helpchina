var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var ProductActions = require('../actions/ProductActions.js');
var ProductStore = require('../store/ProductStore.js');
// var Actions = require('../actions/Actions.js');
// var Store = require('../store/Store.js');
var Products = require('./ProductsView.jsx');
var CartItems = require('./cart/CartBar.jsx');

var App = React.createClass({
    mixins: [Reflux.connect(ProductStore,"products")],

	render: function () {
		return (
            <div>
                <Products products={this.state.products} />
            </div>
		)
	}
});


module.exports = App;