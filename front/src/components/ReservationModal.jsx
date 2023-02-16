import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'
import Loading from "./Loading";
import { ReservationModalContext } from "../context/ReservationModalContext";
import TimeFormat from "../utils/TimeFormat";
import NewReservation from "../libs/reservation/NewReservation";

export default function ReservationModal() {

    const { currentUser } = useContext(UserContext)
    const { ReservationModal, toggleModals } = useContext(ReservationModalContext)
    const [validation, setValidation] = useState("")
    const [reservation, setReservation] = useState({})
    const [formIsComplete, setFormIsComplete] = useState(false)
    const [loading, setLoading] = useState(false);

    // Send form and reset input value, or show error message
    function firstForm(e) {
        e.preventDefault()
        setLoading(true)
        let hour
        const hours = document.querySelectorAll('.hour')

        hours.forEach(el => {
            if (el.classList.contains('selected')) {
                hour = el.textContent
            }
        });

        setReservation({
            number: document.reservation.number.value,
            date: document.reservation.date.value,
            time: hour,
            info: document.reservation.info.value
        })
        setLoading(false)
        toggleModals('secondModal')
    };

    function secondForm(e) {
        e.preventDefault()
        setLoading(true)
        
        setReservation({
            ...reservation,
            name: document.reservation.name.value,
            email: document.reservation.email.value,
            phone: document.reservation.phone.value
        })
        
        setFormIsComplete(!formIsComplete)
    };

    if (formIsComplete) {
        sendReservation()
    }

    async function sendReservation() {
        const isReserved = await NewReservation(reservation)

        if (isReserved) {
            alert('Merci pour votre reservation')
            toggleModals('close')
        } else {
            alert("Oops une erreur s'est produite")
        }

        setLoading(false)
    }

    const closeModal = () => {
        setValidation("")
        toggleModals('close')
    }

    function hourSelect(e) {
        const hours = document.querySelectorAll('.hour')

        hours.forEach(el => {
            if (el.classList.contains('selected')) {
                el.classList.remove('selected')
            }
        });

        if (!e.target.classList.contains('selected')) {
            e.target.classList.add('selected')
        }
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
                                            <div className="hour" onClick={hourSelect}>{TimeFormat(new Date(0, 0, 0, 12, 15, 0))}</div>
                                            <div className="hour" onClick={hourSelect}>{TimeFormat(new Date(0, 0, 0, 12, 30, 0))}</div>
                                        </div>
                                        <label htmlFor="hour">Soir</label>
                                        <div className="hour-select">
                                            <div className="hour" onClick={hourSelect}>{TimeFormat(new Date(0, 0, 0, 19, 30, 0))}</div>
                                            <div className="hour" onClick={hourSelect}>{TimeFormat(new Date(0, 0, 0, 19, 45, 0))}</div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="input">
                                    <label htmlFor="signUpPwd">Information</label>
                                    <textarea
                                        name="info"
                                        cols="30"
                                        rows="5">

                                    </textarea>
                                </div>

                                <p className="text-danger mt-1">{validation}</p>

                                {loading ? <Loading /> : <button className="btn-signin">Suivant</button>}
                            </form>}
                            {ReservationModal.secondModal && <form onSubmit={secondForm} className="sign-up-form" name='reservation'>
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

                                {loading ? <Loading /> : <button className="btn-signin">Reserver</button>}
                            </form>}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
