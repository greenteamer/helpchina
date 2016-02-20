var React = require('react');
var ReactDOM = require('react-dom');
var Products = require('./views/AppView.jsx');
var Product = require('./views/ProductView.jsx');
var CartItems = require('./views/cart/CartBar.jsx');
var CartBox = require('./views/cart/CartPage.jsx');
var Confirm = require('./views/order/Confirm.jsx');
var Account = require('./views/Account/Account.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;


var App = React.createClass({
  render: function() {
      return (
          <div>
            <RouteHandler/>
          </div>
      );
  }
});

var routes = (
    <Route path="/" handler={App}>
        <Route path="/" handler={Products} />
        <Route path="/cart" handler={CartBox} />
        <Route path="/product/:productId" handler={Product} />
        <Route path="/confirm" handler={Confirm} />
        <Route path="/account" handler={Account}/>
    </Route>
);

// для react-router
Router.run(routes, Router.HashLocation, function(Route){
    ReactDOM.render(<Route/>, document.getElementById('products'));
});



//React.render(<Products />, document.getElementById('products'));

ReactDOM.render(<CartItems />, document.getElementById('cartitems'));
