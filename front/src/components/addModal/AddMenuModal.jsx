import React, { useEffect, useState } from "react";
import { IoCloseOutline } from 'react-icons/io5'
import GetDish from "../../libs/dish/GetDish";
import NewMenu from "../../libs/menu/NewMenu";
import Loading from "../Loading";

export default function AddMenuModal({ setAddModal, update }) {

    const [validation, setValidation] = useState("")
    const [loading, setLoading] = useState(false);
    const [dishs, setDishs] = useState(false);

    useEffect(() => {
        loadDishs()
    }, [])
    
    async function loadDishs() {
        setDishs(await GetDish())
    }

    // Send form and reset input value, or show error message
    async function handleForm(e) {
        e.preventDefault()
        setLoading(true)

        const form = document.newmenu
        //console.log(form[1].value);
        const isValid = await NewMenu(form)

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

    function dishsSelect(e) {
        console.log(e.target.value);

    }


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
                        <h4 className="modal-title">Ajouter un Menu</h4>
                    </div>

                    <div className="modal-body">
                        <button onClick={setAddModal} className="btn-close-modal">
                            <IoCloseOutline size="2.5em" />
                        </button>

                        <form onSubmit={handleForm} className="sign-up-form" name='newmenu'>
                            <div className="input">
                                <label>Nom</label>
                                <input
                                    name="name"
                                    required
                                    type="text"
                                    className="form-control"
                                />
                            </div>

                            <div className="input">
                                <label>Plats</label>
                                {dishs ? <select name="Dish" required multiple>
                                    {dishs.map(dish =>
                                        <option key={dish.id} value={dish.id}>{dish.type} | {dish.name}</option>
                                    )}
                                </select> : <Loading />}
                            </div>

                            <div className="input">
                                <label>Prix</label>
                                <input
                                    name="price"
                                    required
                                    type="number"
                                    className="form-control"
                                />
                            </div>

                            <div className="input">
                                <label>Type</label>
                                <select name="type" required defaultValue="Entrée / Plat / Dessert" onChange={dishsSelect}>
                                    <option value="Entrée / Plat">Entrée / Plat</option>
                                    <option value="Plat / Dessert">Plat / Dessert</option>
                                    <option value="Entrée / Plat / Dessert">Entrée / Plat / Dessert</option>
                                </select>
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
