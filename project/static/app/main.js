var React = require('react');
var Products = require('./views/AppView.jsx');
var CartItems = require('./views/cart/Cart.jsx');

//<CartItems cartitems={this.state.cartitems}/>

React.render(
	React.createElement(Products, null),
	document.getElementById('products')
);

React.render(
    React.createElement(CartItems, null),
    document.getElementById('cartitems')
);