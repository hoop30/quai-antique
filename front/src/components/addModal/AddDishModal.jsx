import React, { useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import NewDish from "../../libs/dish/NewDish";
import Loading from "../Loading";

export default function AddDishModal({ setAddModal, update }) {

    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        const form = document.newdish

        const isValid = await NewDish(form)

        if (isValid === true) {
            setValidation("")
            closeModal()
            setLoading(false)
            update()
            return
        } else if (typeof isValid === 'string') {
            setValidation(isValid)
            setLoading(false)
            return
        }
        
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

                        <form onSubmit={handleForm} className="sign-up-form" name='newdish'>
                            <div className="input">
                                <label>Type</label>
                                <select name="type">
                                    <option value="Entrée">Entrée</option>
                                    <option value="Plat">Plat</option>
                                    <option value="Dessert">Dessert</option>
                                </select>
                            </div>

                            <div className="input">
                                <label>Nom</label>
                                <input 
                                    type="text"
                                    name="name"
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="input">
                                <label>Prix</label>
                                <input 
                                    type="number"
                                    name="price"
                                    required
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
