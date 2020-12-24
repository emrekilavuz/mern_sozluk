import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './fetchop';
const PrivateRoute = ({component : Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />

            ) : (<Redirect to={{
                pathname : "/"
            }}
        />)
    }
    />
);

export default PrivateRoute;