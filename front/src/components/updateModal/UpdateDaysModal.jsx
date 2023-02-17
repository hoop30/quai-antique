import React, { useEffect, useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import GetDayById from "../../libs/days/GetDaysById";
import UpdateDays from "../../libs/days/UpdateDays";
import Loading from "../Loading";

export default function UpdateDaysModal({ setUpdateModal, id, update }) {

    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState(null);

    useEffect(() => {
        getResource()
    }, [])

    async function getResource() {
        setDays(await GetDayById(id))
    }

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        const form = document.newdish

        const isValid = await UpdateDays(form, id)

        if (isValid) {
            setValidation("")
            closeModal()
            setLoading(false)
            update()
            return
        }

        setValidation("Oops, une erreur c'est produite!")
        setLoading(false)
    };

    const closeModal = () => {
        setValidation("")
        setUpdateModal(null)
    }

    return (
        <>
            <div className="modal">
                <div onClick={closeModal} className="overlay">
                </div>
                <div className="modal-box">

                    <div className="modal-header">
                        <h4 className="modal-title">Modidifer un Jour</h4>
                    </div>

                    <div className="modal-body">
                        <button onClick={closeModal} className="btn-close-modal">
                            <IoCloseOutline size="2.5em" />
                        </button>

                        <form onSubmit={handleForm} className="sign-up-form" name='newdish'>
                            {days ? <>
                                <div className="input">
                                <label>Jour</label>
                                <select name="value" required defaultValue={days.value} disabled>
                                    <option value="Lundi">Lundi</option>
                                    <option value="Mardi">Mardi</option>
                                    <option value="Mercredi">Mercredi</option>
                                    <option value="Jeudi">Jeudi</option>
                                    <option value="Vendredi">Vendredi</option>
                                    <option value="Samedi">Samedi</option>
                                    <option value="Dimanche">Dimanche</option>
                                </select>
                                <label>Ouverture ?</label>
                                <select name="type" required defaultValue={days.type}>
                                    <option value="open">Toute la journée</option>
                                    <option value="noon">Midi uniquement</option>
                                    <option value="evening">Soir uniquement</option>
                                    <option value="close">Fermer</option>
                                </select>
                            </div>

                                <p className="text-danger mt-1">{validation}</p>

                                {loading ? <Loading /> : <button className="btn-signin">Envoyer</button>}
                            </> : <Loading />}
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
