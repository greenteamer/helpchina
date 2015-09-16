var React = require('react');


var CartItem = React.createClass({
    render : function(){
        return(
            <div>
                {this.props.cartitem.id}
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