var React = require('react');
var Actions = require('../actions/Actions.js');
var Store = require('../store/Store.js');
var AddToCart = require('./Addtocart.jsx');

var Product = React.createClass({
    getInitialState: function () {
        return {
            product: {}
        }
    },
    componentWillMount: function() {
        if (this.props.params) {
            console.log('ProductView componentDidMount : ', this.props.params.productId);
            var productId = this.props.params.productId;
            Actions.getProduct(productId);
        } else {
            this.setState({
                product: this.props.product
            });
        }
        Store.bind('productTrigger', this.setProduct);
    },
    componentWillUnmount: function(){
        Store.unbind('productTrigger', this.setProduct);
    },
    setProduct: function() {
        console.log('ProductView Store.product :', Store.product);
        this.setState({
            product: Store.product
        });
    },
    render : function(){
        //console.log('this.props.params.productId: ', this.props.params.productId);
        if (this.state.product.description) {
            var description = this.state.product.description.slice(0,100);
            var slug = "/#/product/"+this.state.product.id;
            return(
                <div className="col-md-4 product">
                    <a href={slug}><img width="100%" src={this.state.product.product_images[0].image} alt=""/></a>
                    <h3>{ this.state.product.name }</h3>
                    <p className="description_product">{ description }</p>
                    <p>
                        <a className="" href={slug}>подробнее о товаре</a>
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
                <h1></h1>
            )
        }

    }
});

module.exports = Product;