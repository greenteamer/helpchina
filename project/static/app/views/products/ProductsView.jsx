var React = require('react');
var Link = require('react-router').Link;
var AddToCart = require('./Addtocart.jsx');
// var Product =  require('./ProductView.jsx');


var Product = React.createClass({
    render : function(){
        if (this.props.product.description) {
            var description = this.props.product.description.slice(0,100);
            var slug = "/product/"+this.props.product.id;
            return(
                <div className="col-md-4 product">
                    <a href={slug}><img width="100%" src={this.props.product.product_images[0].image} alt=""/></a>
                    <h3>{ this.props.product.name }</h3>
                    <p className="description_product">{ description }</p>
                    <p>
                        <Link to={slug}>подробнее о товаре</Link>
                    </p>
                    <p>
                        <i className="fa fa-chevron-down"></i>
                        ЦЕНА : <b>{ this.props.product.price }</b> рублей
                    </p>
                    <p>
                        <i className="fa fa-chevron-down"></i>
                        ВЕС: {this.props.product.weight} килограмм
                    </p>
                    <AddToCart product_id={this.props.product.id}/>
                </div>
            )
        } else {
            return (
                <h1></h1>
            )
        }

    }
});



var Products = React.createClass({
    // mixins: [Reflux.ListenerMixin, Reflux.connect(ProductStore,"products")],
    // mixins: [Reflux.connect(ProductStore,"products")],
    
    render: function(){
        var items;
        if (!this.props.products.length) {
            return null    
        }
        items = this.props.products.map((product) => {
            return <Product key={product.id} product={product}/>;
        });
        
        return(
            <div className="row">
                {items}
            </div>
        )
    }
});


module.exports = Products;
