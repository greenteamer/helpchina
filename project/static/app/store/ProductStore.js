var Reflux = require('reflux');
var ProductActions = require('../actions/ProductActions.js');
var _ = require('underscore');

// устанавливаем ключ 'products' для localStorage
var localstorage_key = 'products';


var ProductStore = Reflux.createStore({

	listenables: [ProductActions],

	onGetProduct(slug){
		console.log('new slug: ', slug);
		$.ajax({
			url: '/api/products/' + slug,
			dataType: 'json',
			cache: false,
			success: (function(data){
				this.product = data;
				this.updateObject(data);
				console.log("reflux data: ", data)
				// this.trigger(data);
			}).bind(this),
			error: (function(){
				console.log('ajax_error');
			}).bind(this)
		});	
	},

	updateObject: function(product){
		// console.log('store updateList');
        // localStorage.setItem(localstorage_key, JSON.stringify(products));
        // меняем переменную products у нашего store
        this.product = product;
        // отправляем обновленный список товаров всем слушателям (ProductsView)
        this.trigger(product); 
    }

});


module.exports = ProductStore;