import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo-quai-antique.png'
import GetOpenHours from '../libs/openHours/GetOpenHours'
import TimeFormat from '../utils/TimeFormat'

export default function Footer() {

    const [noon, setNoon] = useState()
    const [evening, setEvening] = useState()
    useEffect(() => {
        fetchHours()
    }, [])

    async function fetchHours() {
        const newHours = await GetOpenHours()
        newHours.map(hour => {
            if (hour.type === 'noon') {
                setNoon({
                    open: TimeFormat(hour.open),
                    close: TimeFormat(hour.close)
                })
            } else if (hour.type === 'evening') {
                setEvening({
                    open: TimeFormat(hour.open),
                    close: TimeFormat(hour.close)
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
                {noon && evening && <p>Ouverture Toutes la semaine, le midi de {noon.open} à {noon.close}. En soirée de {evening.open} à {evening.close}</p>}
                <button><p>Réservez</p></button>
            </div>
        </footer>
    )
}
