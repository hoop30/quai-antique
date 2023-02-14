import { createContext, useState } from "react";

export const UserModalContext = createContext()

export function UserModalContextProvider(props) {

  // Modal show state
  const [modalState, setModalState] = useState(false)

  // Modal toggle state
  function toggleModal() {
    setModalState(!modalState)
  }

  return (
    <UserModalContext.Provider value={{modalState, toggleModal}}>
      {props.children}
    </UserModalContext.Provider>
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