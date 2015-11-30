var Dispatcher = require('../dispatcher/Dispatcher.js');
var MicroEvent = require('microevent');
var merge = require('merge');
var $ = require('jquery');
var _ = require('underscore');
var Cookies = require('js-cookie');


var Store = merge(MicroEvent.prototype, {

    products: [],
    productsChange: function(){
        console.log('trigger done');
        this.trigger('productsChange');
    },

    product: {},
    productTrigger: function(){
        this.trigger('productTrigger');
    },

    cartitems: [],
    cartitemsChange: function(){
        //console.log('triger cartitemsChange');
        this.trigger('cartitemsChange');
    }
});

Dispatcher.register(function (payload){
    switch (payload.actionType){
        case 'get-products':
            console.log('dispatcher done');

            // ajax запрос на адрес /api/products/
            $.ajax({
                url: '/api/products/',
                dataType: 'json',
                cache: false,
                success: (function(data){
                    Store.products = data;
                    Store.productsChange();
                }).bind(this),
                error: (function(){
                    console.log('ajax_error');
                }).bind(this)
            });
            break;

        case 'get-product':
            console.log('dispatcher done');
            // ajax запрос на адрес /api/product/1
            $.ajax({
                url: '/api/products/'+payload.productId,
                dataType: 'json',
                cache: false,
                success: (function(data){
                    console.log('dispatcher product :', data);
                    Store.product = data;
                    Store.productTrigger();
                }).bind(this),
                error: (function(){
                    console.log('ajax_error');
                }).bind(this)
            });
            break;

        case 'get-cartitems':
            //ajax запрос на адрес api/cartitems/
            $.ajax({
                url: '/api/v2/get-user-cartitems/',
                dataType: 'json',
                cache: false,
                success: (function(data){
                    Store.cartitems = data;
                    Store.cartitemsChange();
                }).bind(this),
                error: (function(){
                    console.log('ajax_error');
                }).bind(this)
            });
            break;

        //добавляем товар в корзину
        case 'addtocart':
            //отправить POST запрос
            console.log('addtocart');
            var csrftoken = Cookies.get('csrftoken');
            $.post(
                '/addtocart/',
                {
                    csrfmiddlewaretoken: csrftoken,
                    id : payload.id,
                    count : payload.count
                }
            ).success(function(data){
                console.log('Store addtocart cartitem: ', data);

                var exist_item = _.find(Store.cartitems, function(item){
                    // если выполняется условие ниже то возвратим текущий item в exist_item
                    return (item.id == data.id && item.cart_id == data.cart_id);
                });
                if (exist_item){
                    exist_item.count = data.count;
                } else {
                    Store.cartitems.push(data);
                }

                Store.cartitemsChange();
            }).error(function(){
                console.log("error")
            });

            //$.(".ajax-submit").onclick("click",function(){
            //    var csrftoken = $.cookie('csrftoken');
            //    console.log('ajax-submit');
            //})
            break;
        case 'setCount':
            var csrftoken = Cookies.get('csrftoken');
            //payload.item
            _.each(Store.cartitems, function(item){
                if (item.id == payload.item.id){
                    item.count = payload.statecount
                }
            });
            Store.cartitemsChange();
            console.log('change count', payload.statecount, payload.item.id);
            $.post(
                '/change-count/',
                {
                    csrfmiddlewaretoken: csrftoken,
                    count : payload.statecount,
                    id : payload.item.id
                }
            ).success(function(data){
                    console.log('success');
            });
            break;
    }
    return true;
});


module.exports = Store;