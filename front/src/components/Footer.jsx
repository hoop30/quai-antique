import React from 'react'
import logo from '../assets/img/logo-quai-antique.png'

export default function Footer() {
    return (
        <footer>
            <div className="footer-logo">
                <img src={logo} alt="Quai Antique" />
                <p>Ouvert Toutes la semaine le midi et en soirée</p>
            </div>
            <div className="footer-nav">
                <p>Navigation</p>
                <p><a href="/">Accueil</a></p>
            </div>
            <div className="footer-cta">
                <p>Ouverture Toutes la semaine, le midi de 11h45 à 13h30. En soirée de 19h30 à 22h</p>
                <button><p>Réservez</p></button>
            </div>
        </footer>
    )
}
