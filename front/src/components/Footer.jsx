import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo-quai-antique.png'
import GetOpenHours from '../libs/openHours/GetOpenHours'
import TimeFormat from '../utils/TimeFormat'

export default function Footer() {

    const [hours, setHours] = useState()
    useEffect(() => {
        fetchHours()
    }, [])
    
    async function fetchHours() {
        const newHours = await GetOpenHours()
        newHours.map(hour => {
            if (hour.type === 'noon') {
                setHours({
                    noonOpen: TimeFormat(hour.open),
                    noonClose: TimeFormat(hour.close)
                })
            }
            if (hour.type === 'evening') {
                setHours({
                    eveningOpen: TimeFormat(hour.open),
                    eveningClose: TimeFormat(hour.close)
                })
            }
        })
    }

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
                {hours && <p>Ouverture Toutes la semaine, le midi de {hours.noonOpen} à {hours.noonClose}. En soirée de {hours.eveningOpen} à {hours.eveningClose}</p>}
                <button><p>Réservez</p></button>
            </div>
        </footer>
    )
}
