export default async function NewReservation(reservation) {

    const newReservation = JSON.stringify(reservation)

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newReservation
    }

    return fetch('http://localhost:5000/reservation', params)
        .then(response => { return response.json() })
        .then(() => true)
        .catch(() => false)
}
