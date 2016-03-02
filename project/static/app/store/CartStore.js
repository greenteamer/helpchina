var Reflux = require('reflux');
var CartActions = require('../actions/CartActions.js');
var _ = require('underscore');
var $ = require('jquery');
var Cookies = require('js-cookie');

// устанавливаем ключ 'products' для localStorage
// var localstorage_key = 'cart';


var CartStore = Reflux.createStore({

	listenables: [CartActions],

	onAddToCart(count, id){
		//отправить POST запрос
        var csrftoken = Cookies.get('csrftoken');
        $.post(
            '/addtocart/',
            {
                csrfmiddlewaretoken: csrftoken,
                id : id,
                count : count
            }
        ).success((data)=>{                
            data = data[0];
            var exist_item = _.find(this.cartitems, (item)=>{
                // если выполняется условие ниже то возвратим текущий item в exist_item
                return (item.id == data.id && item.cart_id == data.cart_id);
            });

            if (exist_item){
                exist_item.count = data.count;
            } else {
                this.cartitems.push(data);
            }

            this.updateList(this.cartitems)
        }).error(function(err){
            console.log("error: ", err)
        });
	},

	updateList(cartitems){
        // меняем переменную products у нашего store
        this.cartitems = cartitems;
        // отправляем обновленный список товаров всем слушателям (ProductsView)
        this.trigger(cartitems); 
    },

    getInitialState(){
		$.ajax({
			url: '/api/cartitems/',
			dataType: 'json',
			cache: false,
			success: (function(data){
				this.cartitems = data;
				this.updateList(data);
			}).bind(this),
			error: (function(){
				console.log('ajax_error');
			}).bind(this)
		});	
		return this.cartitems;
	}

});


module.exports = CartStore;