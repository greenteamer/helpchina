var React = require('react');
var Product =  require('./ProductView.jsx');

var Products = React.createClass({
    render: function(){
        var items = this.props.products.map(function(product){
            return(
                <Product  product={product}/>
            )
        });
        return(
            <div className="row">{items}</div>
        )
    }
});

module.exports = Products;