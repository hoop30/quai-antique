import React, { useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import Loading from "./Loading";

export default function AddHourModal({ setAddModal }) {

    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)


        setValidation("Oops, une erreur c'est produite!")
        setLoading(false)
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

                        <form onSubmit={handleForm} className="sign-up-form" name='update'>
                            <div className="input">
                                <label>Jour</label>
                                <select name="Dish" required>
                                    <option value="Lundi">Lundi</option>
                                    <option value="Mardi">Mardi</option>
                                    <option value="Mercredi">Mercredi</option>
                                    <option value="Jeudi">Jeudi</option>
                                    <option value="Vendredi">Vendredi</option>
                                    <option value="Samedi">Samedi</option>
                                    <option value="Dimanche">Dimanche</option>
                                </select>
                                <label>Ouverture ?</label>
                                <select name="Dish" required>
                                    <option value="open">Toute la journée</option>
                                    <option value="noon">Midi uniquement</option>
                                    <option value="evening">Soir uniquement</option>
                                    <option value="close">Fermer</option>
                                </select>
                            </div>
                            
                            <p className="text-danger mt-1">{validation}</p>

                            {loading ? <Loading /> : <button className="btn-signin">Envoyer</button>}

                        </form>

                        <form onSubmit={handleForm} className="sign-up-form" name='update'>

                            <div className="input">
                                <label>Horraire</label>
                                <select name="Dish" required>
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

                            {loading ? <Loading /> : <button className="btn-signin">Envoyer</button>}
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
