import React, { useEffect, useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import GetDishById from "../../libs/dish/GetDishById";
import UpdateDish from "../../libs/dish/UpdateDish";
import Loading from "../Loading";

export default function UpdateDishModal({ setUpdateModal, id, update }) {

    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const [dish, setDish] = useState(null);

    useEffect(() => {
        getResource()
    }, [])

    async function getResource() {
        setDish(await GetDishById(id))
    }

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        const form = document.newdish

        const isValid = await UpdateDish(form, id)

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
                        <h4 className="modal-title">Modidifer un Plat</h4>
                    </div>

                    <div className="modal-body">
                        <button onClick={closeModal} className="btn-close-modal">
                            <IoCloseOutline size="2.5em" />
                        </button>

                        <form onSubmit={handleForm} className="sign-up-form" name='newdish'>
                            {dish ? <>
                                <div className="input">
                                    <label>Type</label>
                                    <select name="type" defaultValue={dish.type}>
                                        <option value="Entr??e">Entr??e</option>
                                        <option value="Plat">Plat</option>
                                        <option value="Dessert">Dessert</option>
                                    </select>
                                </div>

                                <div className="input">
                                    <label>Nom</label>
                                    <input
                                        defaultValue={dish.name}
                                        type="text"
                                        name="name"
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="input">
                                    <label>Prix</label>
                                    <input
                                        defaultValue={dish.price}
                                        type="number"
                                        name="price"
                                        required
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
