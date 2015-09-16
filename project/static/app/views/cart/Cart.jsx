var React = require('react');


var CartItem = React.createClass({
    render : function(){
        return(
            <div>
                <p>{this.props.cartitem.id}</p>
                <p>{this.props.cartitem.product}</p>
            </div>
        )
    }
});


var CartItems = React.createClass({
    render: function(){
        //var test = [
        //    {id:1},
        //    {id:2},
        //    {id:3}
        //];
        var items = this.props.cartitems.map(function(item){
            return(
                <CartItem cartitem={item}/>
            )
        });
        return(
            <div>{items}</div>
        )
    }
});


module.exports = CartItems;