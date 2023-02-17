import React, { useEffect, useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import GetDish from "../../libs/dish/GetDish";
import GetDishById from "../../libs/dish/GetDishById";
import UpdateDish from "../../libs/dish/UpdateDish";
import GetMenuById from "../../libs/menu/GetMenuById";
import UpdateMenu from "../../libs/menu/UpdateMenu";
import Loading from "../Loading";

export default function UpdateMenuModal({ setUpdateModal, id, update }) {

    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(null);
    const [dishs, setDishs] = useState(false);

    useEffect(() => {
        getResource()
    }, [])

    async function getResource() {
        setMenu(await GetMenuById(id))
        setDishs(await GetDish())
    }

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        const form = document.newdish

        const isValid = await UpdateMenu(form, id)

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
                        <h4 className="modal-title">Modidifer un Menu</h4>
                    </div>

                    <div className="modal-body">
                        <button onClick={closeModal} className="btn-close-modal">
                            <IoCloseOutline size="2.5em" />
                        </button>

                        <form onSubmit={handleForm} className="sign-up-form" name='newdish'>
                            {menu ? <>
                                <div className="input">
                                    <label>Nom</label>
                                    <input
                                        defaultValue={menu.name}
                                        name="name"
                                        required
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="input">
                                    <label>Plats</label>
                                    {dishs ? <select name="Dish" defaultValue={menu.Dish} required multiple>
                                        {dishs.map(dish =>
                                            <option key={dish.id} value={dish.id}>{dish.type} | {dish.name}</option>
                                        )}
                                    </select> : <Loading />}
                                </div>

                                <div className="input">
                                    <label>Prix</label>
                                    <input
                                        defaultValue={menu.price}
                                        name="price"
                                        required
                                        type="number"
                                        className="form-control"
                                    />
                                </div>

                                <div className="input">
                                    <label>Type</label>
                                    <select name="type" required defaultValue={menu.type} >
                                        <option value="Entrée / Plat">Entrée / Plat</option>
                                        <option value="Plat / Dessert">Plat / Dessert</option>
                                        <option value="Entrée / Plat / Dessert">Entrée / Plat / Dessert</option>
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
