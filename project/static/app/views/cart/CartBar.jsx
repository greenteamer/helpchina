var React = require('react');
var Store = require('../../store/Store.js');
var Actions = require('../../actions/Actions.js');

var Link = require('react-router').Link;


var CartItem = React.createClass({
    render : function(){
        var link = "/product/" + this.props.cartitem.product.id;

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
        // console.log('test +');
        Actions.getCartitems();
        Store.bind('cartitemsChange', this.getCaritems);
    },
    componentWillUnmount:function(){
        Store.unbind('cartitemsChange', this.getCaritems);
    },
    getCaritems: function(){
        // console.log('getCartItem func', Store.cartitems);
        this.setState({
            cartitems: Store.cartitems
        });
    },
    render: function(){
        // console.log('test render cartitems', this.state.cartitems);

        var items = this.state.cartitems.map(function(item){
            return(
                <CartItem cartitem={item} key={item.id}/>
            )
        });
        // console.log('items : ', items);
        return(
            <div className="cart">

                <div className="btn-group" style={{display: "block"}}>
                    <a href="javascript:void(0)" className="btn btn-default">
                        <i className="mdi-action-shopping-cart"></i>
                    </a>
                    <div className="btn-group">
                        <a href="bootstrap-elements.html" data-target="#" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            Корзина
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            {items}
                        </ul>
                        <Link to="cart" className="btn btn-primary btn-sm">В корзину</Link>                    </div>
                </div>


            </div>
        )
    }
});


module.exports = CartItems;
