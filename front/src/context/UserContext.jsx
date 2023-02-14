import { createContext, useEffect, useState } from "react";
import GetUserById from "../libs/user/GetUserById";

export const UserContext = createContext()

export function UserContextProvider(props) {

  // Store user state (connected or not), and loading to wait the user state
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      stayConnect(localStorage.getItem('userId'))
    } else {
      setLoadingData(false)
    }
  }, [])
  
  // connect user
  function connection(user) {
    setCurrentUser([user.name, user.email, user.Reservation, user.roles])
    localStorage.setItem('userId', user.id);
    setLoadingData(false)
  }
  // stay connect
  async function stayConnect() {
    connection(await GetUserById(localStorage.getItem('userId')))
  }

  //disconnect user
  function disconnect() {
    setCurrentUser(null)
    localStorage.removeItem('userId');
  }

  // Modal show state
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false
  })

  // Modal toggle state
  const toggleModals = modal => {
    if(modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true
      })
    }
    if(modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false
      })
    }
    if(modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false
      })
    }
  }

  return (
    <UserContext.Provider value={{modalState, toggleModals, currentUser, connection, disconnect}}>
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}

// Where it's used
/*
    import { useContext } from 'react'
    import { ThemeContext } from './    /ThemeContext'

    const {Theme} = useContext(ThemeContext)

    {Theme}
*/

// For parents
/*
import ThemeContextProvider from './    /ThemeContext'

    <ThemeContextProvider>
        Children here
    </ThemeContextProvider>
*/