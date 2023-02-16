import { createContext, useEffect, useState } from "react";
import GetUserById from "../libs/user/GetUserById";

export const UserContext = createContext()

export function UserContextProvider(props) {

  // Store user state (connected or not), and loading to wait the user state
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    update()
  }, [])
  
  function update() {
    if (sessionStorage.getItem('userId')) {
      stayConnect(sessionStorage.getItem('userId'))
    } else {
      setLoadingData(false)
    }
  }

  // connect user
  function connection(user) {
    setCurrentUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      info: user.info,
      reservation: user.Reservation,
      roles: user.roles
    })
    sessionStorage.setItem('userId', user.id);
    setLoadingData(false)
  }
  // stay connect
  async function stayConnect(id) {
    connection(await GetUserById(sessionStorage.getItem('userId')))
  }

  //disconnect user
  function disconnect() {
    setCurrentUser(null)
    sessionStorage.removeItem('userId');
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
    <UserContext.Provider value={{modalState, toggleModals, currentUser, connection, disconnect, update}}>
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