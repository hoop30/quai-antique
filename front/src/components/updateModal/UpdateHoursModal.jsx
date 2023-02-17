import React, { useEffect, useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import GetOpenHoursById from "../../libs/openHours/GetOpenHoursById";
import UpdateOpenHours from "../../libs/openHours/UpdateOpenHours";
import Loading from "../Loading";

export default function UpdateHoursModal({ setUpdateModal, id, update }) {

    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const [hours, setHours] = useState(null);

    useEffect(() => {
        getResource()
    }, [])

    async function getResource() {
        setHours(await GetOpenHoursById(id))
    }

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        const form = document.newdish

        const isValid = await UpdateOpenHours(form, id)

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
                        <h4 className="modal-title">Modidifer une Horraire</h4>
                    </div>

                    <div className="modal-body">
                        <button onClick={closeModal} className="btn-close-modal">
                            <IoCloseOutline size="2.5em" />
                        </button>

                        <form onSubmit={handleForm} className="sign-up-form" name='newdish'>
                            {hours ? <>
                                <div className="input">
                                <label>Horraire</label>
                                <select name="type" required defaultValue={hours.type} disabled>
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
                            </> : <Loading />}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
