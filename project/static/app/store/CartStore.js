var Reflux = require('reflux');
var CartActions = require('../actions/CartActions.js');
var _ = require('underscore');

// устанавливаем ключ 'products' для localStorage
// var localstorage_key = 'cart';


var CartStore = Reflux.createStore({

	listenables: [CartActions],

	updateList: function(cartitems){
		// console.log('store updateList');
        // localStorage.setItem(localstorage_key, JSON.stringify(products));
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
				console.log("reflux cartitems data: ", data)
				// this.trigger(data);
			}).bind(this),
			error: (function(){
				console.log('ajax_error');
			}).bind(this)
		});	
		return this.cartitems;
	}

});


module.exports = CartStore;