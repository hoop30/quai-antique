import React, { useContext, useRef, useState } from "react";
import { UserModalContext } from "../context/UserModalContext";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'
import Loading from "./Loading";

export default function SignInModal() {


    const { modalState, toggleModal } = useContext(UserModalContext)
    const { currentUser } = useContext(UserContext)
    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const inputs = useRef([])
    inputs.current = []
    const formRef = useRef()

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)

        setLoading(false)
    };

    const closeModal = () => {
        setValidation("")
        toggleModal()
    }

    return (
        <>
            {modalState && (
                <div className="modal">
                    <div onClick={closeModal} className="overlay">
                    </div>
                    <div className="modal-box">

                        <div className="modal-header">
                            <h4 className="modal-title">Modifier vos Information</h4>
                        </div>

                        <div className="modal-body">
                            <button onClick={closeModal} className="btn-close-modal">
                                <IoCloseOutline size="2.5em" />
                            </button>
                            <form ref={formRef} onSubmit={handleForm} className="sign-up-form" name='signIn'>
                                <div className="input">
                                    <label htmlFor="signUpPwd">Nom</label>
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        className="form-control"
                                        id="signUpName"
                                        value={currentUser[0]}
                                    />
                                </div>

                                <div className="input">
                                    <label>E-mail</label>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="form-control"
                                        value={currentUser[1]}
                                    />
                                </div>

                                <div className="input">
                                    <label>Info</label>
                                    <textarea name="info" cols="30" rows="5" value={currentUser[2]}></textarea>
                                </div>

                                <p className="text-danger mt-1">{validation}</p>

                                {loading ? <Loading /> : <button className="btn-signin">Envoyer</button>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
