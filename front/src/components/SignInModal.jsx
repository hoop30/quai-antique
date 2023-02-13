import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'
import UserMatch from "../utils/UserMatch";
import Loading from "./Loading";

export default function SignInModal() {

    const { modalState, toggleModals, connection } = useContext(UserContext)
    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const inputs = useRef([])
    inputs.current = []
    const formRef = useRef()

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        const form = document.signIn

        const user = await UserMatch(form, setValidation)
        
        if (user) {
            connection(user)
            toggleModals("close")
        }
        setLoading(false)
    };

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

    return (
        <>
            {modalState.signInModal && (
                <div className="modal">
                    <div onClick={closeModal} className="overlay">
                    </div>
                    <div className="modal-box">

                        <div className="modal-header">
                            <h4 className="modal-title">Connection</h4>
                        </div>

                        <div className="modal-body">
                            <button onClick={closeModal} className="btn-close-modal">
                                <IoCloseOutline size="2.5em" />
                            </button>
                            <form ref={formRef} onSubmit={handleForm} className="sign-up-form" name='signIn'>
                                <div className="input">
                                    <label htmlFor="signUpEmail">Email</label>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="form-control"
                                        id="signUpEmail"
                                        placeholder="example@mail.fr"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="signUpPwd">Mot de passe</label>
                                    <input
                                        name="password"
                                        required
                                        type="password"
                                        className="form-control"
                                        id="signUpPwd"
                                        placeholder="Password"
                                    />
                                </div>

                                <p className="text-danger mt-1">{validation}</p>

                                {/* switch to signUp modal */}
                                <div className="modal-switch">
                                    <button onClick={() => toggleModals("signUp")}>Pas de Compte?</button>
                                </div>

                                
                                {loading ? <Loading /> : <button className="btn-signin">Connection</button>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
