var React = require('react');
var render = require('react-dom').render;

var Router = require('react-router').Router;
var Route = require('react-router').Route;

var browserHistory = require('react-router').browserHistory;

var App = require('./views/AppView.jsx');
var ProductPage = require('./views/products/ProductPageView.jsx');
var CartBox = require('./views/cart/CartPage.jsx');
var Confirm = require('./views/order/Confirm.jsx');
var Account = require('./views/Account/Account.jsx');
var Menu = require('./views/menu/MenuView.jsx');


var routes = (
  <Route path="/" component={App}>
	<Route path="cart" component={CartBox} />
	<Route path="product/:productId" component={ProductPage} />
	<Route path="confirm" component={Confirm} />
	<Route path="account" component={Account}/>
  </Route>
);


render(
  <Router history={browserHistory} routes={routes}/>
, document.getElementById('site'))


// render(<CartItems />, document.getElementById('cartitems'));
