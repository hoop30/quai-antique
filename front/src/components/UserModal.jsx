import React, { useContext, useEffect, useState } from "react";
import { UserModalContext } from "../context/UserModalContext";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'
import Loading from "./Loading";
import UpdateUser from "../libs/user/UpdateUser";
import { Navigate } from "react-router-dom";

export default function SignInModal() {


    const { modalState, toggleModal } = useContext(UserModalContext)
    const { currentUser, update } = useContext(UserContext)
    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({})

    useEffect(() => {
        setInputValue({
            name : currentUser[0],
            email: currentUser[1],
            info: currentUser[2]
        })
    }, [modalState])

    function handleChange(e) {
        const input = e.target.value
        const attr = e.target.name
        setInputValue({
            ...inputValue,
            [attr]: input
        })
    }
    
    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)

        const isUpdate = await UpdateUser(document.update, currentUser[1])

        if (isUpdate === true) {
            setValidation("")
            closeModal()
            setLoading(false)
            update()
            return
        } else if (typeof isUpdate === 'string') {
            setValidation(isUpdate)
            setLoading(false)
            return
        }

        setValidation("Oops, une erreur c'est produite!")
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
                            <form onSubmit={handleForm} className="sign-up-form" name='update'>
                                <div className="input">
                                    <label>Nom</label>
                                    <input
                                        onChange={handleChange}
                                        name="name"
                                        required
                                        type="text"
                                        className="form-control"
                                        id='0'
                                        value={inputValue.name}
                                    />
                                </div>

                                <div className="input">
                                    <label>E-mail</label>
                                    <input
                                        onChange={handleChange}
                                        name="email"
                                        required
                                        type="email"
                                        className="form-control"
                                        value={inputValue.email}
                                    />
                                </div>

                                <div className="input">
                                    <label>Info</label>
                                    <textarea
                                        onChange={handleChange}
                                        name="info"
                                        cols="30"
                                        rows="5"
                                        value={inputValue.info}
                                    ></textarea>
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
