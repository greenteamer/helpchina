var React = require('react');
var AppView = require('./views/AppView.jsx');


React.render(
	React.createElement(AppView, null),
	document.getElementById('products')
);