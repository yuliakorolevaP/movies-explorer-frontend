import React from 'react';
import { Navigate } from "react-router-dom";
import Preloader from '../Preloader/Preloader';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const jwt = localStorage.getItem('jwt');
  return (
    props.isLoading ? <Preloader /> : !!jwt ? <Component {...props} /> : props.isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />
  )
};

export default ProtectedRouteElement;