var React = require('react');
var Store = require('../../store/Store.js');
var Actions = require('../../actions/Actions.js');


var Account = React.createClass({
    render : function(){
        var link = "/#/product/" + this.props.cartitem.product.id;
        return(
            <div className="cartitem">
                <img className="cart_item_image" src={this.props.cartitem.product.product_images[0].image}/>
                <p className="title"><a href={link}>{this.props.cartitem.product.name}</a></p>
                <p>цена: {this.props.cartitem.product.price}</p>
                <p>шт: {this.props.cartitem.count}</p>
            </div>
        )
    }
});



module.exports = Account;