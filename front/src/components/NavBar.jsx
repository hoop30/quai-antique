import React, { useContext, useState } from 'react'
import { UserContext } from "../context/UserContext"
import logo from '../assets/img/logo-quai-antique.png'

export default function NavBar() {

    const { toggleModals, currentUser, setCurrentUser } = useContext(UserContext)
    const [menu, setMenu] = useState(false)
    
    // Set the Btn LogIn/LogOut
    function log() {
        currentUser === null ? toggleModals("signIn") : setCurrentUser()
    }

    return (
        <div className='navbar'>
            <img className="logo-qa" src={logo} alt="Quai Antique" width='100' height='30' />
            <nav>
                <div className={menu ? 'navbar-menu show' : 'navbar-menu'}>
                    <ul>
                        <li><a href="/"><h3>Accueil</h3></a></li>
                        <li><a href="/admin"><h3>Admin</h3></a></li>
                        <li>
                            <button
                                id='log'
                                className='nav-link'
                                onClick={() => {
                                    log()
                                }}>
                                <h3>{currentUser === null ? 'Connection' : 'Deconnection'}</h3>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={menu ? 'menu-btn open' : 'menu-btn'} onClick={() => setMenu(!menu)}>
                    <span className='btn-ligne l1'></span>
                    <span className='btn-ligne l2'></span>
                    <span className='btn-ligne l3'></span>
                </div>
            </nav>
        </div>
    )
}
