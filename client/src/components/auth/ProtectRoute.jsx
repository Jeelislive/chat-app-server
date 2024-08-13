import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({ children, user, redirect = "/login" }) => {
    if (!user) return <Navigate to={ redirect } />
    
    return children ? children : <Outlet />;
    
};
    export default ProtectRoute;


    