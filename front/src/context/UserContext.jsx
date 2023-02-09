import { createContext, useState } from "react";

export const UserContext = createContext()

export function UserContextProvider(props) {

  // Store user state (connected or not), and loading to wait the user state
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  
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
    <UserContext.Provider value={{modalState, toggleModals, currentUser, setCurrentUser}}>
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}