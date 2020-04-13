import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import MainRouter from "./pages/mainRouter";
import App from "./App";
import Login from './pages/login'
import Home from './pages/home'
import NoMatch from "./pages/nomatch";
import BuyBooks from "./pages/buyBooks";
import ShoppingCar from "./pages/shoppingCar";
import UserOrderManagement from "./pages/userordermanagement";
import ChangeInformation from "./pages/changeInformation";
import UserManagement from "./pages/userManagement";
import BookManagement from "./pages/bookmanagement";
import AdminOrderManagement from "./pages/adminordermanagement";
import Register from './pages/register'

export default class Router extends React.Component {
    state={
        userRole:''
    };
    componentWillMount() {
        if (localStorage.getItem('token')==null ||localStorage.getItem('loginState')==null) {

        }else {
            let user = localStorage.getItem('token');
            let userObj = JSON.parse(user);
            let userRole = userObj.r_type;
            console.log(userRole);
            this.setState({
                userRole
            });
        }
    }
    render() {
        return (
            <HashRouter>
                <MainRouter>
                    <Switch>
                        <Route path='/login' exact component={Login}></Route>
                        <Route path='/register' exact component={Register}></Route>
                        <Route path='/' render={() =>
                            <App>
                                <Switch>
                                    <Route path='/home' exact component={Home}></Route>
                                    <Route path='/buyBooks/:id' component={BuyBooks}></Route>
                                    <Route path='/shoppingCar' component={ShoppingCar}></Route>
                                    <Route path='/userOrder' component={UserOrderManagement}></Route>
                                    <Route path='/changeInformation' component={ChangeInformation}></Route>
                                    <Route path='/userManagement' component={UserManagement}></Route>
                                    <Route path='/bookManagement' component={BookManagement}></Route>
                                    <Route path='/AdminOrderManagement' component={AdminOrderManagement}></Route>
                                    { this.state.userRole==1 ? <Redirect to="/userManagement"/> : <Redirect to="/home"/>}
                                    <Route component={NoMatch}></Route>
                                </Switch>
                            </App>
                        }></Route>



                    </Switch>
                </MainRouter>
            </HashRouter>
        );
    }
}