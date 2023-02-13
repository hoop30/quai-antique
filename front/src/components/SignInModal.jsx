import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'

export default function SignInModal() {

  const { modalState, toggleModals, signIn } = useContext(UserContext)
  const [validation, setValidation] = useState("")
  const inputs = useRef([])
  inputs.current = []
  const formRef = useRef()

  // Store form input value on any change
  const addInputs = (el) => {

    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  // Send form and reset input value, or show error message
  const handleForm = async (e) => {
    e.preventDefault()

    try {
      await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      )

      setValidation("");
      toggleModals("close")
    } catch {
      setValidation("Email and/or password incorrect")
    }
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
              <form ref={formRef} onSubmit={handleForm} className="sign-up-form">
                <div className="input">
                  <label htmlFor="signUpEmail">Email</label>
                  <input
                    ref={addInputs}
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
                    ref={addInputs}
                    name="pwd"
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

                <button className="btn-signin">Connection</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
