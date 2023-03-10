import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'
import Loading from "./Loading";
import { ReservationModalContext } from "../context/ReservationModalContext";
import NewReservation from "../libs/reservation/NewReservation";
import GetOpenHours from "../libs/openHours/GetOpenHours";
import OpenToCloseHour from "../utils/OpenToCloseHour";

export default function ReservationModal() {

    const { currentUser } = useContext(UserContext)
    const { ReservationModal, toggleModals } = useContext(ReservationModalContext)
    const [validation, setValidation] = useState("")
    const [openHours, setOpenHours] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getResource()
    }, [])

    async function getResource() {

        const resource = await GetOpenHours()
        const openToClose = OpenToCloseHour(resource)
        setOpenHours(openToClose)
    }

    // Send form and reset input value, or show error message
    async function firstForm(e) {
        e.preventDefault()
        setLoading(true)

        let hour
        const hours = document.querySelectorAll('.hour')
        const form = document.reservation

        hours.forEach(el => {
            if (el.classList.contains('selected')) {
                hour = el.textContent
            }
        });

        const isReserved = await NewReservation(form, hour)

        if (isReserved && hour) {
            alert('Merci pour votre reservation')
            toggleModals('close')
        } else if (!hour) {
            setValidation('veuillez selecionner une horraire')
            setLoading(false)
            return
        } else {
            alert("Oops une erreur s'est produite")
        }

        setValidation('')
        setLoading(false)
        toggleModals('close')
    };

    const closeModal = () => {
        setValidation("")
        toggleModals('close')
    }

    return (
        <>
            {ReservationModal.modal && (
                <div className="modal">
                    <div onClick={closeModal} className="overlay">
                    </div>
                    <div className="modal-box">

                        <div className="modal-header">
                            <h4 className="modal-title">Reservation</h4>
                        </div>

                        <div className="modal-body">
                            <button onClick={closeModal} className="btn-close-modal">
                                <IoCloseOutline size="2.5em" />
                            </button>
                            {ReservationModal.firstModal && <form onSubmit={firstForm} className="sign-up-form" name='reservation'>
                                <div className="input">
                                    <label htmlFor="signUpEmail">Convives</label>
                                    <input
                                        name="number"
                                        required
                                        type="number"
                                        className="form-control"
                                        min='1'
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="signUpPwd">Date</label>
                                    <input
                                        name="date"
                                        required
                                        type="date"
                                        className="form-control"
                                    />
                                </div>

                                <div className="input">
                                    <fieldset>
                                        <label htmlFor="hour">Midi</label>
                                        <div className="hour-select">
                                            {openHours && openHours.noon}
                                        </div>
                                        <label htmlFor="hour">Soir</label>
                                        <div className="hour-select">
                                            {openHours && openHours.evening}
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="input">
                                    <label htmlFor="signUpPwd">Information</label>
                                    <textarea
                                        name="info"
                                        cols="30"
                                        rows="5"
                                    >
                                    </textarea>
                                </div>

                                <div className="input">
                                    <label htmlFor="signUpEmail">Nom</label>
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="signUpEmail">E-mail</label>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="signUpEmail">Telephone</label>
                                    <input
                                        name="phone"
                                        required
                                        type="tel"
                                        className="form-control"
                                    />
                                </div>

                                <p className="text-danger mt-1">{validation}</p>

                                {loading ? <Loading /> : <button className="btn-signin">Suivant</button>}
                            </form>}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
