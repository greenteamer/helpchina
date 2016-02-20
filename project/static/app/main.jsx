var React = require('react');
var render = require('react-dom').render;

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;

var browserHistory = require('react-router').browserHistory;


var Products = require('./views/AppView.jsx');
var Product = require('./views/ProductView.jsx');
var CartItems = require('./views/cart/CartBar.jsx');
var CartBox = require('./views/cart/CartPage.jsx');
var Confirm = require('./views/order/Confirm.jsx');
var Account = require('./views/Account/Account.jsx');
var Menu = require('./views/menu/MenuView.jsx');


const App = React.createClass({
  render() {
    return (
      <div className="row">
        <Menu/>
        <div className="col-xs-12 col-md-8"> 
          {this.props.children || <Products/>}
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


var routes = (
  <Route path="/" component={App}>
    <Route path="/" component={Products} />
    <Route path="cart" component={CartBox} />
    <Route path="product/:productId" component={Product} />
    <Route path="confirm" component={Confirm} />
    <Route path="account" component={Account}/>
  </Route>
);


render(
  <Router history={browserHistory} routes={routes}/>
, document.getElementById('site'))


// render(<CartItems />, document.getElementById('cartitems'));
