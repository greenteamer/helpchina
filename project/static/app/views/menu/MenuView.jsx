var React = require('react');
var Link = require('react-router').Link;

var Actions = require('../../actions/Actions.js');
var Store = require('../../store/Store.js');

var MenuView = React.createClass({
    getInitialState() {
        return {
            menu_items: []
        }
    },

    componentWillMount() {
        Actions.getMenuItems();
    },

    componentDidMount: function () {
        Store.bind('menuItemsChange', this.getMenu);
    },
    componentWillUnmount: function () {
        Store.unbind('menuItemsChange', this.getMenu);
    },

    getMenu(){
        console.log("menu component getMenu start");
        this.setState({
            menu_items: Store.menu_items
        })
    },

    render(){
        var items = this.state.menu_items.map(function(item){
            return(
                <li>
                    <Link to={item.url}>{item.name}</Link>
                </li>
            )
        });
        return(
            <nav id="navbar-example" className="navbar  navbar-default navbar-static" role="navigation">
              <div className="container-fluid">
                <div className="collapse navbar-collapse bs-example-js-navbar-collapse">
                    <ul className="nav navbar-nav">
                        {items}
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li id="fat-menu" className="dropdown">
                            <a href="#" className="dropdown-toggle cart_button_dropdown" data-toggle="dropdown">Личный Кабинет</a>
                            <ul className="dropdown-menu">
                                <li><a href="/article-add/" target="_blank">Добавить статью</a></li>
                                <li><a href="/page/dostavka/">Доставка</a></li>
                                <li><a href="/account/" >Мой аккаунт</a></li>
                                <li className="divider"></li>
                                <li><a href="/cart/" >Корзина</a></li>
                                    <li><a href="/logout/" >Выйти</a></li>
                                    <li><a href="/login/" >Войти</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
              </div>
            </nav>
        )
    }
});

module.exports = MenuView;
