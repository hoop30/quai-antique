import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { UserModalContext } from '../../context/UserModalContext'

export default function Compte() {

    const { currentUser, toggleModals } = useContext(UserContext)
    const { toggleModal } = useContext(UserModalContext)

    if (!currentUser) {
        toggleModals('signIn')
        return <Navigate to="/" />
    }

    return (
        <div className='compte'>
            <table>
                <caption>Information de votre Compte</caption>
                <tbody>
                    <tr>
                        <th>Nom</th>
                        <td>{currentUser[0]}</td>
                    </tr>
                    <tr>
                        <th>E-mail</th>
                        <td>{currentUser[1]}</td>
                    </tr>
                    <tr>
                        <th>Telephone</th>
                        <td>{currentUser[2]}</td>
                    </tr>
                    <tr>
                        <th>Info</th>
                        <td>{currentUser[3]}</td>
                    </tr>
                    <tr>
                        <th>Reservation</th>
                        <td>{currentUser[4]}</td>
                    </tr>
                    <tr className='change'>
                        <td align='center'><button onClick={toggleModal}><p>Modifier</p></button></td>
                        <td align='center'><button className='suprim'><p>Suprimer</p></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
