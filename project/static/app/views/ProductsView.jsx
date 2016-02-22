var React = require('react');
var Product =  require('./ProductView.jsx');


var Products = React.createClass({
    // mixins: [Reflux.ListenerMixin, Reflux.connect(ProductStore,"products")],
    // mixins: [Reflux.connect(ProductStore,"products")],
    
    render: function(){
        var items = this.props.products.map(function(product){
            return(
                <Product key={product.id} product={product}/>
            )
        });
        return(
            <div className="row">
                {items}
            </div>
        )
    }
});


module.exports = Products;
