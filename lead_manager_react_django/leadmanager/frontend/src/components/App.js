import React, {Fragment} from "react"
import ReactDOM from "react-dom"
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import {Provider} from 'react-redux';
import store from "../store"
import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from './layout/Alerts'
import {loadUser} from "../actions/auth"

//Alert options
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

class App extends React.Component {
    componentDidMount(){
        store.dispatch(loadUser())
    }
    render(){
        return(
            <Provider store = {store}>
                <AlertProvider template = {AlertTemplate} {...alertOptions} >
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className = "container">
                                <Switch>
                                    <PrivateRoute exact path = "/" component = {Dashboard}/>
                                    <Route exact path = "/register" render = {() => <Register/>}/>
                                    <Route exact path = "/login" render = {() => <Login/>}/>
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))