var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ProductActions = require('../actions/ProductActions.js');
var ProductStore = require('../store/ProductStore.js');

var AddToCart = require('./Addtocart.jsx');
// var Actions = require('../actions/Actions.js');
// var Store = require('../store/Store.js');


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


module.exports = Product;
