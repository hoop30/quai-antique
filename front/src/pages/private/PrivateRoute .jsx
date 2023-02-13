import React, { useContext } from 'react'
import { UserContext } from "../../context/UserContext";
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

  const { currentUser } = useContext(UserContext)

  console.log(currentUser[3]);

  if (!currentUser[3].includes('ROLE_ADMIN') || !currentUser) {
    return <Navigate  to="/"/>
  } 

  return children;
}
