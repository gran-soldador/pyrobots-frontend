import React from "react";
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoutes = () => {
  let isLogged = localStorage.getItem('user') ? true : false;

  if (!isLogged) {
    return <Navigate to='/login' />;
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoutes;