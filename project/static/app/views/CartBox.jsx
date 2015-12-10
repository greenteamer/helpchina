var React = require('react');
var Actions = require('../actions/Actions.js');
var Store = require('../store/Store.js');
var _ = require('underscore');


var CartItemCount = React.createClass({
    getInitialState : function(){
        return {
          count : this.props.item.count
        }
    },

    plusCount : function() {
        var item = this.props.item;
        var statecount = this.state.count + 1;
        Actions.setCount(statecount, item);
        console.log("+1", statecount);
        this.setState({
            count : statecount
        });
    },
    minusCount : function(){
        var item = this.props.item;
        if(this.state.count > 1 ){
            var statecount =  this.state.count - 1;
            Actions.setCount(statecount, item);
            this.setState({
                count : statecount
            });
        }
    },
    changeCount : function(e){
        e.preventDefault();
        var item = this.props.item;
        var statecount =  e.target.value;
        Actions.setCount(statecount, item);
        this.setState({
            count : statecount
        });

    },
    render : function(){
        return (
            <div>
                <button  onClick={this.minusCount} className="btn btn-primary" type="button"> - </button>
                <input onChange={this.changeCount}  type="text" value={this.state.count}/>
                <button onClick={this.plusCount} className="btn btn-primary" type="button"> + </button>
            </div>
        )
    }
});


var CartBox = React.createClass({
    getInitialState : function(){
        return {
            cartitems: []
        }
    },
    componentWillMount: function(){
        Actions.getCartitems();
        Store.bind('cartitemsChange', this.getCartitems);
    },
    componentWillUnmount : function(){
        Store.unbind('cartitemsChange', this.getCartitems);
    },
    getCartitems : function(){
        console.log('getCartitems fun component : ', Store.cartitems);
        this.setState({
            cartitems: Store.cartitems
        });
    },

    clickDelete : function(e){
        e.preventDefault();
        var id = e.target.id;
        Actions.deleteCartitem(id);
        var newCartitems = _.filter(this.state.cartitems, function(item){
            return item.id != id;
        });
        this.setState({
            cartitems: newCartitems
        });
    },


    render: function(){
        console.log('render component befor after: ', this.state.cartitems);
        var state_items = this.state.cartitems;
        var self = this;
        console.log('render component befor after: ', this.state.cartitems);
        var items = _.map(state_items, function(item){
            var price = item.count*item.product.price;
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product.name}</td>
                    <td><CartItemCount  item={item}/></td>
                    <td>{item.product.price}</td>
                    <td>{price}</td>
                    <td>
                        <button
                            data-id={item.id}
                            id={item.id}
                            ref="deletebutton"
                            onClick={self.clickDelete}
                            className="btn btn-primary btn-sm">Удалить</button>
                    </td>
                </tr>
            );
        });

        console.log('items var: ', items);

        return (
            <div className="test123">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Название товара</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Стоимость</th>
                          <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                  </table>
                </div>
                 <a href="/#/confirm" className="btn btn-primary btn-sm">
                        Оформить заказ
                 </a>
            </div>
        )
    }
});

module.exports = CartBox;