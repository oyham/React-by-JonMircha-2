import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ private: Private }) => {
    //simualcion de autenticación
    let auth;
    auth = true;
    auth = null;

    return auth ? <Private /> : <Navigate to="/login" />;
}

export default PrivateRoute