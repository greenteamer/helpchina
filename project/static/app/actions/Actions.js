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
    }
};


module.exports = Actions;