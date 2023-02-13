import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'
import NewUser from "../libs/user/NewUser";
import IsValidPassword from "../utils/IsValidPassword";
import CompareUserEmail from "../libs/user/CompareUserEmail";
import Loading from "./Loading";

export default function SignUpModal() {

  const { modalState, toggleModals } = useContext(UserContext);
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  // Test input value, send form and reset input value, or show error message
  async function isValidForm(e) {
    e.preventDefault()
    setLoading(true)
    const form = document.user

    const isValidPassowrd = await IsValidPassword(form.password.value, form.pwd.value, setValidation)

    const isUniqueEmail = await CompareUserEmail(document.user.email.value)

    if (isUniqueEmail && isValidPassowrd) {
      setValidation('')
      NewUser(form)
      alert (`Merci ${document.user.name.value}, Votre compte a bien été créé, vous pouvez vous connecter.`)
      toggleModals("signIn")
    } else if (!isUniqueEmail) {
      setValidation('E-mail deja utiliser')
    }
    
    setLoading(false)
  }

  const closeModal = () => {
    setValidation("")
    toggleModals("close")
  }

  return (
    <>
      {modalState.signUpModal && (
        <div className="modal">
          <div onClick={closeModal} className="overlay">
          </div>
          <div className="modal-box">

            <div className="modal-header">
              <h4 className="modal-title">Création de Compte</h4>
            </div>

            <div className="modal-body">
              <button onClick={closeModal} className="btn-close-modal">
                <IoCloseOutline size="2.8em" />
              </button>
              <form ref={formRef} onSubmit={isValidForm} className="sign-up-form" name="user">
                <div className="input">
                <label htmlFor="signUpPwd">Nom</label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    id="signUpName"
                    placeholder="Jhon"
                  />
                </div>

                <div className="input">
                <label htmlFor="signUpPwd">E-mail</label>
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
                <label htmlFor="signUpPwd">Comfirmation de Mot de passe</label>
                  <input
                    name="pwd"
                    required
                    type="password"
                    className="form-control"
                    id="repeatPwd"
                    placeholder="Repeat Password"
                  />
                </div>

                <p className="text-danger mt-1">{validation}</p>

                {/* switch to signIn modal */}
                <div className="modal-switch">
                  <button onClick={() => toggleModals("signIn")}>Déjà un Compte?</button>
                </div>

                {loading ? <Loading /> : <button className="btn-signin">Crée mon Compte</button>}
              </form>
            </div>


          </div>
        </div>
      )}
    </>
  );
}
