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

var Product = React.createClass({
    render : function(){
        var description = this.props.product.description.slice(0,100);
        var slug = "/product/"+this.props.product.slug+"/";
        return(
            <div className="col-md-4 product">
                <a href={slug}><img width="100%" src={this.props.product.product_images[0].image} alt=""/></a>
                <h3>{ this.props.product.name }</h3>
                <p className="description_product">{ description }</p>
                <p>
                    <a className="" href={slug}>подробнее о товаре</a>
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
    }
});

module.exports = Product;