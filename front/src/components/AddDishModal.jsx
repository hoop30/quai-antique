import React, { useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import Loading from "./Loading";

export default function AddDishModal({ setAddModal }) {

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
                        <h4 className="modal-title">Ajouter un Plat</h4>
                    </div>

                    <div className="modal-body">
                        <button onClick={setAddModal} className="btn-close-modal">
                            <IoCloseOutline size="2.5em" />
                        </button>

                        <form onSubmit={handleForm} className="sign-up-form" name='update'>
                            <div className="input">
                                <label>dish</label>
                                <input
                                    name="name"
                                    required
                                    type="text"
                                    className="form-control"
                                    id='0'
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
