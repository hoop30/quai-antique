import React, { createContext, useState } from 'react'

export const ReservationModalContext = createContext()

const ReservationModalContextProvider = (props) => {

    const [ReservationModal, setReservationModal] = useState({
        firstModal: false,
        secondModal: false,
        modal: false
    })

    const toggleModals = modal => {
        if (modal === "firstForm") {
            setReservationModal({
                firstModal: true,
                secondModal: false,
                modal: true
            })
        }
        if (modal === "secondModal") {
            setReservationModal({
                firstModal: false,
                secondModal: true,
                modal: true
            })
        }
        if (modal === "close") {
            setReservationModal({
                firstModal: false,
                secondModal: false,
                modal: false
            })
        }
    }

    return (
        <ReservationModalContext.Provider value={{ ReservationModal, toggleModals }}>
            {props.children}
        </ReservationModalContext.Provider>
    )
}

export default ReservationModalContextProvider

// Where it's used
/*
    import { useContext } from 'react'
    import { ReservationModalContext } from './    /ReservationModalContext'

    const {ReservationModal} = useContext(ReservationModalContext)

    {ReservationModal}
*/

// For parents
/*
import ReservationModalContextProvider from './    /ReservationModalContext'

    <ReservationModalContextProvider>
        Children here
    </ReservationModalContextProvider>
*/