import React, { useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import NewDays from "../../libs/days/NewDays";
import NewOpenHours from "../../libs/openHours/NewOpenHours";
import Loading from "../Loading";

export default function AddHourModal({ setAddModal, update }) {

    const [validation, setValidation] = useState("")
    const [loadingDays, setLoadingDays] = useState(false);
    const [loadingHours, setLoadingHours] = useState(false);

    // Send form and reset input value, or show error message
    async function daysSubmit(e) {
        e.preventDefault()
        setLoadingDays(true)
    
        const form = document.newDays

        const isValid = await NewDays(form)

        if (isValid === true) {
            setValidation("")
            closeModal()
            setLoadingDays(false)
            update()
            return
        } else if (typeof isValid === 'string') {
            setValidation(isValid)
            setLoadingDays(false)
            return
        }

        setValidation("Oops, une erreur c'est produite!")
        setLoadingDays(false)
    };

    async function hoursSubmit(e) {
        e.preventDefault()
        setLoadingHours(true)

        const form = document.newHours

        const isValid = await NewOpenHours(form)

        if (isValid === true) {
            setValidation("")
            closeModal()
            setLoadingHours(false)
            update()
            return
        } else if (typeof isValid === 'string') {
            setValidation(isValid)
            setLoadingHours(false)
            return
        }

        setValidation("Oops, une erreur c'est produite!")
        setLoadingHours(false)
    };

    const closeModal = () => {
        setValidation("")
        setAddModal(null)
    }

    return (
        <>
            <div className="modal">
                <div onClick={closeModal} className="overlay">
                </div>
                <div className="modal-box">

                    <div className="modal-header">
                        <h4 className="modal-title">Ajouter une Horraire</h4>
                    </div>

                    <div className="modal-body">
                        <button onClick={setAddModal} className="btn-close-modal">
                            <IoCloseOutline size="2.5em" />
                        </button>

                        <form onSubmit={daysSubmit} className="sign-up-form" name='newDays'>
                            <div className="input">
                                <label>Jour</label>
                                <select name="value" required>
                                    <option value="Lundi">Lundi</option>
                                    <option value="Mardi">Mardi</option>
                                    <option value="Mercredi">Mercredi</option>
                                    <option value="Jeudi">Jeudi</option>
                                    <option value="Vendredi">Vendredi</option>
                                    <option value="Samedi">Samedi</option>
                                    <option value="Dimanche">Dimanche</option>
                                </select>
                                <label>Ouverture ?</label>
                                <select name="type" required>
                                    <option value="open">Toute la journée</option>
                                    <option value="noon">Midi uniquement</option>
                                    <option value="evening">Soir uniquement</option>
                                    <option value="close">Fermer</option>
                                </select>
                            </div>
                            
                            <p className="text-danger mt-1">{validation}</p>

                            {loadingDays ? <Loading /> : <button className="btn-signin">Envoyer</button>}

                        </form>

                        <form onSubmit={hoursSubmit} className="sign-up-form" name='newHours'>

                            <div className="input">
                                <label>Horraire</label>
                                <select name="type" required>
                                    <option value="noon">Midi</option>
                                    <option value="evening">Soir</option>
                                </select>
                                <label>overture</label>
                                <input
                                    name="open"
                                    required
                                    type="time"
                                    className="form-control"
                                />
                                <label>fermeture</label>
                                <input
                                    name="close"
                                    required
                                    type="time"
                                    className="form-control"
                                />
                            </div>

                            <p className="text-danger mt-1">{validation}</p>

                            {loadingHours ? <Loading /> : <button className="btn-signin">Envoyer</button>}
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
