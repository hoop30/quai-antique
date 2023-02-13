import React, { useContext } from 'react'
import { UserContext } from "../../context/UserContext";
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

  const { currentUser } = useContext(UserContext)

  console.log(currentUser);

  if (currentUser !== 'admin') {
    return <Navigate  to="/"/>
  } 

  return children;
}
