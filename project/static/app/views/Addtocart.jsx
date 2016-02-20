var React = require('react');
var Actions = require('../actions/Actions.js');


var AddToCart = React.createClass({
    getInitialState: function(){
        return {
            count: 1
        }
    },

    changeCount: function(e){
        //e= это событие которое принимаеет функция
        this.setState({
            count: e.target.value
        });
    },
    minusCount : function(){
        if(this.state.count >1){
            var new_count = this.state.count - 1;
            this.setState({
                count: new_count
            });
        }
    },
    plusCount : function(){
        var new_count = this.state.count + 1;
        this.setState({
            count: new_count
        });
    },
    addtocart : function(){
        // console.log('добавляем в корзина ');
        Actions.addtocart(this.state.count, this.props.product_id);
    },
    render : function(){
        return(
            <div className="col-md-4 addtocart">
                <button onClick={this.minusCount} className="btn btn-primary" type="button"> - </button>
                <input onChange={this.changeCount} type="text" value={this.state.count}/>
                <button onClick={this.plusCount} className="btn btn-primary" type="button"> + </button>
                <button onClick={this.addtocart} className="btn btn-primary" type="button">Добавить</button>
            </div>

        )
    }
});

module.exports = AddToCart;