var React = require('react');
var Reflux = require('reflux');
var Products = require('./products/ProductsView.jsx');


const App = React.createClass({
	render() {
		return (
			<div className="row">
				<div className="col-xs-12 col-md-8"> 
					<Products products={this.props.products} />
				</div>
				<div className="col-xs-12 col-md-4">
					<div id="cartitems">
					</div>
				</div>
			</div>
		)
	}
})


const ServerRender = React.createClass({
	render() {
		return (
			<App products={this.props.products} />
		)
	}
})


module.exports = ServerRender;