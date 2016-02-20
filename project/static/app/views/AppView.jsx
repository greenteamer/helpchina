var React = require('react');
var ReactDOM = require('react-dom');
var Actions = require('../actions/Actions.js');
var Store = require('../store/Store.js');
var Products = require('./ProductsView.jsx');
var CartItems = require('./cart/CartBar.jsx');

var App = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            date: 'август',
            cartitems: []
        }
    },
    componentWillMount: function(){
        Actions.getProducts();
    },
    componentDidMount: function () {
        Store.bind('productsChange', this.getProducts);
    },
    componentWillUnmount: function () {
        Store.unbind('productsChange', this.getProducts);
    },
    getProducts: function() {
        Actions.getCartitems();
        console.log('getProducts done +ss');
        this.setState({
            products: Store.products
        });
    },
	render: function () {
		return (
            <div>
                <Products products={this.state.products} />
            </div>
		)
	}
});


module.exports = App;