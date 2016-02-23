var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var _ = require('underscore');

var ProductActions = require('../../actions/ProductActions.js');
var ProductStore = require('../../store/ProductStore.js');

var AddToCart = require('./Addtocart.jsx');



var ProductPageView = React.createClass({
    mixins: [Reflux.connect(ProductStore,"product")],

    getInitialState(){
        return {
            product: {}
        }
    },

    componentWillMount(){
        ProductActions.getProduct(this.props.params.productId);
    },

    render : function(){
        console.log('product object: ', this.state.product);
        if (!_.isEmpty(this.state.product)) {
            var description = this.state.product.description.slice(0,100);
            var slug = "/product/"+this.state.product.id;
            return(
                <div className="col-md-12 product">
                    <a href={slug}><img width="100%" src={this.state.product.product_images[0].image} alt=""/></a>
                    <h3>{ this.state.product.name }</h3>
                    <p className="description_product">{ description }</p>
                    <p>
                        <Link to={slug}>подробнее о товаре</Link>
                    </p>
                    <p>
                        <i className="fa fa-chevron-down"></i>
                        ЦЕНА : <b>{ this.state.product.price }</b> рублей
                    </p>
                    <p>
                        <i className="fa fa-chevron-down"></i>
                        ВЕС: {this.state.product.weight} килограмм
                    </p>
                    <AddToCart product_id={this.state.product.id}/>
                </div>
            )
        } else {
            return (
                <h1>Объект пуст</h1>
            )
        }

    }
});


module.exports = ProductPageView;
