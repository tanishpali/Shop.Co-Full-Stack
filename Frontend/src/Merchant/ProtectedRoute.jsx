import React from 'react';
import Cookies from 'js-cookie';
import AccessRestricted from './Modals/AccessRestricted';

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token');

    if (!token) {
        // Show premium Access Restricted UI if not authenticated
        return <AccessRestricted />;
    }

    return children;
};

export default ProtectedRoute;
