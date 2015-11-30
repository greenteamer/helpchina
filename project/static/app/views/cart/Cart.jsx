var React = require('react');
var Store = require('../../store/Store.js');
var Actions = require('../../actions/Actions.js');


var CartItem = React.createClass({
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


var CartItems = React.createClass({
    getInitialState:function(){
        return{
            cartitems : []
        }
    },
    componentWillMount:function(){
        Actions.getCartitems();
        Store.bind('cartitemsChange', this.getCaritems);
    },
    componentWillUnmount:function(){
        Store.unbind('cartitemsChange', this.getCaritems);
    },
    getCaritems: function(){
        console.log('getCartitems');
        console.log(Store.cartitems);
        this.setState({
            cartitems: Store.cartitems
        });
    },
    render: function(){
        console.log();

        var items = this.state.cartitems.map(function(item){
            return(
                <CartItem cartitem={item}/>
            )
        });
        return(
            <div className="cart">

                <div className="btn-group" style={{display: "block"}}>
                    <a href="javascript:void(0)" className="btn btn-default">
                        <i className="mdi-action-shopping-cart"></i>
                    </a>
                    <div class="btn-group">
                        <a href="bootstrap-elements.html" data-target="#" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            Корзина
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            {items}
                        </ul>
                    </div>
                </div>


            </div>
        )
    }
});


module.exports = CartItems;