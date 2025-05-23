import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const idRol = localStorage.getItem('idRol');

    // Si el rol es 2 (user), redirige a "/login"
    if (idRol === '2' || idRol === 2) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default PrivateRoute;
