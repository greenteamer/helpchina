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


const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/cart">cart</Link></li>
          <li><IndexLink to="/">Home</IndexLink></li>
        </ul>
        {this.props.children || <Products/>}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})


// routes = (
//     <Route path="/" component={App}>
//       <Route path="about" component={About} />
//       <Route path="inbox" component={Inbox}>
//         <Route path="messages/:id" component={Message} />
//       </Route>
//     </Route>
// )

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
, document.getElementById('products'))


render(<CartItems />, document.getElementById('cartitems'));
