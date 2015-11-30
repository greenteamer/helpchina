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
    render : function(){
        return (
            <div>
                <button  onClick={this.minusCount} className="btn btn-primary" type="button"> - </button>
                <input  type="text" value={this.state.count}/>
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
        this.setState({
            cartitems: Store.cartitems
        });
    },

    clickDelete : function(){
        var newCartitems = this.state.cartitems;
        //newCartitems = _.filter(newCartitems, function(item){
        //    return item.id != this.refs.deletebutton.getDOMNode().attrs("data-id");
        //});
        this.setState({
            cartitems: newCartitems
        });
        console.log('clickDelet', this.refs.deletebutton.getDOMNode().getAttribute("data-id"));
    },

    render: function(){
        var state_items = this.state.cartitems;
        var clickDelete = this.clickDelete.bind(this);
        var items = _.map(state_items, function(item){
            var price = item.count*item.product.price;
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.product.name}</td>
                    <td><CartItemCount  item={item}/></td>
                    <td>{item.product.price}</td>
                    <td>{price}</td>
                    <td>
                        <button data-id={item.id} ref="deletebutton" onClick={clickDelete} className="btn btn-primary">Удалить</button>
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
                        <th>2</th>
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
            </div>
        )
    }
});

module.exports = CartBox;