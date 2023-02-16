export default async function NewReservation(form, hour) {

    const reservation = {
            number: Number(form.number.value),
            date: form.date.value,
            time: hour,
            info: form.info.value,
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value
        }

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
