import React, { useContext} from 'react'
import { RiAccountCircleLine } from 'react-icons/ri'
import { UserContext } from "../context/UserContext"


export default function NavBar() {

  const { toggleModals, currentUser, setCurrentUser } = useContext(UserContext)

  // Set the Btn LogIn/LogOut
  function log() {
    currentUser === null ? toggleModals("signIn") : setCurrentUser()
  }
  
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
      <button
        id='log'
        className='nav-link'
        onClick={() => {
          log()
        }}>
        <RiAccountCircleLine size="1.8em" />
        {currentUser === null ? 'Login' : 'Logout'}
      </button>
    </nav>
  )
}
