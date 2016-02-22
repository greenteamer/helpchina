var Reflux = require('reflux');
var ProductActions = require('../actions/ProductActions.js');
var _ = require('underscore');

// устанавливаем ключ 'products' для localStorage
var localstorage_key = 'products';


var ProductStore = Reflux.createStore({
	// listenables: [ProductActions],

	updateList: function(products){
		console.log('store updateList');
        localStorage.setItem(localstorage_key, JSON.stringify(products));
        // меняем переменную products у нашего store
        this.products = products;
        // отправляем обновленный список товаров всем слушателям (ProductsView)
        this.trigger(products); 
    },

	getInitialState(){
		// console.log('store getInitialState');
		// получаем данные по ключу localstorage_key из localStorage
		var loaded_products = localStorage.getItem(localstorage_key);
		// _.each(JSON.parse(loaded_products), (pr)=> { console.log(pr) });
		// console.log('store getInitialState loaded_products: ', loaded_products);
		if (!loaded_products) {
			// если в localStorage нет данных берем их по api
			$.ajax({
				url: '/api/products/',
				dataType: 'json',
				cache: false,
				success: (function(data){
					this.products = data;
					this.updateList(data);
					// console.log("reflux data: ", data)
					// this.trigger(data);
				}).bind(this),
				error: (function(){
					console.log('ajax_error');
				}).bind(this)
			});	
		}else{
			// console.log('localStorage is not null');
			this.products = JSON.parse(loaded_products);
		}
		return this.products;
	}

});


module.exports = ProductStore;