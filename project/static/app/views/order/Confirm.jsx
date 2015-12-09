var React = require('react');
var Actions = require('../../actions/Actions.js');
var Alertify = require('../../lib/alertify/lib/alertify.min.js');
var $ = require('jquery');


var Confirm = React.createClass({
    submitOrder: function(e){
        e.preventDefault();
        console.log("перехватили - ", e.target.email.value, e.target.name.value, e.target.phone.value);
        var email = e.target.email.value;
        var name = e.target.name.value;
        var phone = e.target.phone.value;

        if (!email && email.length === 0){
            alertify.alert('введите email');
        } else if (!name && name.length < 2){
            alertify.alert('введите имя');
        } else if (!phone && phone.length < 10){
            alertify.alert('введите сотовый телефон');
        } else {
            Actions.submitOrder(email, name, phone);
        }
    },
    render: function(){

        return(
            <div className="row">
                <form className="form-horizontal" onSubmit={this.submitOrder}>
                  <fieldset>
                    <legend>Оформление заказа</legend>
                    <div className="form-group">
                        <label for="inputEmail" className="col-md-2 control-label">Email</label>

                        <div className="col-md-10">
                            <input type="email" name="email" className="form-control" id="inputEmail" placeholder="Email"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="name" name="name" className="col-md-2 control-label">Имя</label>

                        <div className="col-md-10">
                            <input type="text" className="form-control" id="name" placeholder="Имя"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="phone" className="col-md-2 control-label">Телефон</label>

                        <div className="col-md-10">
                            <input type="text" name="phone" className="form-control" id="phone" placeholder="Телефон"/>
                        </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <button type="button" className="btn btn-default">Cancel</button>
                        <button type="submit" className="btn btn-primary">Отправить</button>
                      </div>
                    </div>
                  </fieldset>
                </form>
            </div>
        )
    }
});

module.exports = Confirm;