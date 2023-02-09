import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoCloseOutline } from 'react-icons/io5'
import NewUser from "../libs/user/NewUser";
import IsValidPassword from "../utils/IsValidPassword";
import CompareUserEmail from "../libs/user/CompareUserEmail";

export default function SignUpModal() {

  const { modalState, toggleModals} = useContext(UserContext);
  const [validation, setValidation] = useState("");
  const formRef = useRef();

  // Test input value, send form and reset input value, or show error message
  async function isValidForm(e) {
    e.preventDefault()
    const form = document.user

    IsValidPassword(form.password.value, form.pwd.value, setValidation)
    
    const isUniqueEmail = await CompareUserEmail(document.user.email.value)
    
    if (isUniqueEmail) {
      setValidation('')
      NewUser(form)
    } else {
      setValidation('E-mail deja utiliser')
      return
    }
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
              <h5 className="modal-title">Sign Up</h5>
              <button onClick={closeModal} className="btn-close-modal">
                <IoCloseOutline size="2.8em" />
              </button>
            </div>

            <div className="modal-body">
              <form ref={formRef} onSubmit={isValidForm} className="sign-up-form" name="user">
                <div className="input">
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    id="signUpName"
                    placeholder="Nom"
                  />
                </div>

                <div className="input">
                  <input
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                    placeholder="Email adress"
                  />
                </div>

                <div className="input">
                  <input
                    name="password"
                    required
                    type="password"
                    className="form-control"
                    id="signUpPwd"
                    placeholder="Password"
                  />
                </div>

                <div className="input">
                  <input
                    name="pwd"
                    required
                    type="password"
                    className="form-control"
                    id="repeatPwd"
                    placeholder="Repeat Password"
                  />
                  <p className="text-danger mt-1">{validation}</p>
                </div>

                <button className="btn-signin">Sign Up</button>
              </form>
            </div>

            {/* switch to signIn modal */}
            <div className="modal-footer">
              <p>Already an account</p>
              <button onClick={() => toggleModals("signIn")}>Sign In</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
