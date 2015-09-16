var React = require('react');
var Actions = require('../actions/Actions.js');
var Store = require('../store/Store.js');
var Products = require('./ProductsView.jsx');
var CartItems = require('./cart/Cart.jsx');

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
        Actions.getCartitems();
    },
    componentDidMount: function () {
        Store.bind('productsChange', this.getProducts);
        Store.bind('cartitemsChange', this.getCaritems);
    },
    componentWillUnmount: function () {
        Store.unbind('productsChange', this.getProducts);
        Store.unbind('cartitemsChange', this.getCaritems);
    },
    getCaritems: function(){
        console.log('getCartitems');
        this.setState({
            cartitems: Store.cartitems
        });
    },
    getProducts: function() {
        console.log('getProducts done');
        this.setState({
            products: Store.products
        });
    },
	render: function () {
		return (
            <div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <CartItems cartitems={this.state.cartitems}/>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-8 col-lg-9">
                    <Products products={this.state.products} />
                </div>
            </div>
		)
	}
});


module.exports = App;