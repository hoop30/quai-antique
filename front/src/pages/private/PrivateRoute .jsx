import React, { useContext } from 'react'
import { UserContext } from "../../context/UserContext";
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

  const { currentUser } = useContext(UserContext)


  if (!currentUser.roles.includes('ROLE_ADMIN') || !currentUser) {
    return <Navigate  to="/"/>
  } 

  return children;
}
