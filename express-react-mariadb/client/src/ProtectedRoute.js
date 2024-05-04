// ProtectedRoute.js
import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, userType, ...rest }) => {
    const isLoggedIn = localStorage.getItem('userType') === userType;
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : window.location.href = '/login'
            }
        />
    );
};

export default ProtectedRoute;
