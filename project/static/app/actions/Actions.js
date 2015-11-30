var Dispatcher = require('../dispatcher/Dispatcher.js');

var Actions = {
    getProducts: function (){
        console.log('getProducts action');
        Dispatcher.dispatch({
            actionType: 'get-products'
        });
    },
    addtocart : function(count,id){
        console.log('addtocart', count, id);
        Dispatcher.dispatch({
            actionType: 'addtocart',
            count: count,
            id: id
        });
    },
    getCartitems: function (){
        console.log('getCartitems action');
        Dispatcher.dispatch({
            actionType: 'get-cartitems'
        });
    },
    setCount: function(statecount, item){
        Dispatcher.dispatch({
            actionType: 'setCount',
            statecount: statecount,
            item: item
        });
    },
    getProduct: function(productId){
        console.log('getProduct action');
        Dispatcher.dispatch({
            actionType: 'get-product',
            productId: productId
        });
    }
};


module.exports = Actions;