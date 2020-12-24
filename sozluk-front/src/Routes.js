import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './home/Home';
import Inside from './home/Inside';
import Uprofil from './profil/Uprofil';
import Ayarlar from './profil/Ayarlar';
import PrivateRoute from './auth/PrivateRoute';
const Routes = () => {
    return (<BrowserRouter>
                <Switch>
                    <Route path="/signin" exact component={Signin}/> 
                    <Route path="/signup" exact component={Signup}/>  
                    <Route path="/" exact component={Home}/>  
                    <PrivateRoute path="/in" exact component={Inside}/>
                    <PrivateRoute path="/prfl" exact component={Uprofil}/>
                    <PrivateRoute path="/ayarlar" exact component={Ayarlar}/>
            </Switch>
        </BrowserRouter>);
}

export default Routes;