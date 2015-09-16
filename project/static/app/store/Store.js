var Dispatcher = require('../dispatcher/Dispatcher.js');
var MicroEvent = require('microevent');
var merge = require('merge');
var $ = require('jquery');
var Cookies = require('js-cookie')


var Store = merge(MicroEvent.prototype, {

    products: [],
    productsChange: function(){
        console.log('trigger done');
        this.trigger('productsChange');
    },

    cartitems: [],
    cartitemsChange: function(){
        console.log('triger cartitemsChange');
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

        case 'get-cartitems':
        //ajax запрос на адрес api/cartitems/
            $.ajax({
                url: '/api/cartitems/',
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
                console.log(data);
            }).error(function(){
                console.log("error")
            });

            //$.(".ajax-submit").onclick("click",function(){
            //    var csrftoken = $.cookie('csrftoken');
            //    console.log('ajax-submit');
            //})
            break;
    }
    return true;
});


module.exports = Store;