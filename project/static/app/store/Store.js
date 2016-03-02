var Dispatcher = require('../dispatcher/Dispatcher.js');
var MicroEvent = require('microevent');
var merge = require('merge');
var $ = require('jquery');
var _ = require('underscore');
var Cookies = require('js-cookie');


var Store = merge(MicroEvent.prototype, {

    menu_items: [],
    menuItemsChange(){
        this.trigger('menuItemsChange')
    },

    products: [],
    productsChange: function(){
        // console.log('trigger done');
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
        case 'get-menuitems':
            // console.log('get menu items start')
            $.ajax({
                url: '/api/menuitems/',
                dataType: 'json',
                cache: false,
                success: (function(data){
                    // console.log("get menu item data:", data);
                    Store.menu_items = data;
                    Store.menuItemsChange();
                }).bind(this),
                error: (function(){
                    console.log('ajax_error');
                }).bind(this)
            });
            break;

        case 'get-products':
            // console.log('dispatcher done');

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
            // console.log('dispatcher done');
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
                    // console.log('Store get-cartitems data: ', data);
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
            // console.log('addtocart with data: ', payload);
            var csrftoken = Cookies.get('csrftoken');
            console.log('csrftoken :', csrftoken);
            $.post(
                '/addtocart/',
                {
                    csrfmiddlewaretoken: csrftoken,
                    id : payload.id,
                    count : payload.count
                }
            ).success(function(data){                
                data = data[0];
                // console.log('Store addtocart cartitem: ', data);
                var exist_item = _.find(Store.cartitems, function(item){
                    // если выполняется условие ниже то возвратим текущий item в exist_item
                    return (item.id == data.id && item.cart_id == data.cart_id);
                });

                if (exist_item){
                    // console.log('exist_item true: ', exist_item);
                    exist_item.count = data.count;
                } else {
                    // console.log('Store.cartitems befor: ', Store.cartitems);                    
                    Store.cartitems.push(data);
                    // console.log('Store.cartitems after: ', Store.cartitems);
                }

                Store.cartitemsChange();
            }).error(function(err){
                console.log("error: ", err)
            });

            //$.(".ajax-submit").onclick("click",function(){
            //    var csrftoken = $.cookie('csrftoken');
            //    console.log('ajax-submit');
            //})
            break;

        case 'deleteCartitem':
            var csrftoken = Cookies.get('csrftoken');
            $.ajax({
                url: '/api/v2/delete-cartitem/',
                type: 'POST',
                data: {
                    id: payload.id,
                    csrfmiddlewaretoken: csrftoken
                },
                success: function(response) {
                    // alert('успех');
                    console.log('success delete cartitem data: ', response);
                }
            });
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
            // console.log('change count', payload.statecount, payload.item.id);
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

        case 'submitOrder':
            //console.log(alertify);
            var csrftoken = Cookies.get('csrftoken');
            $.post(
                '/api/v2/submit-order/',
                {
                    csrfmiddlewaretoken: csrftoken,
                    email: payload.email,
                    name: payload.name,
                    phone: payload.phone
                }
            ).success(function(data){
                    console.log('success');
                    alertify.alert("Cпасибо за заказ");
                });
            break;
    }
    return true;
});


module.exports = Store;