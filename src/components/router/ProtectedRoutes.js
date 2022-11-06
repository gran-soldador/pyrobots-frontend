import React from "react";
import { Navigate, Outlet} from 'react-router-dom';


const ProtectedRoutes = () => {
  let isLogged = false;

  if (localStorage.getItem('user')) {
    isLogged = true;
  }

  if (!isLogged) {
    return <Navigate to='/login' />;
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoutes;