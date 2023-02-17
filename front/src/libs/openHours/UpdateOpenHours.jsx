export default async function UpdateOpenHours(form, id) {

    const updateOpenHours = {
        type: form.type.value,
        open: form.open.value,
        close: form.close.value
    }

    const updateOpenHoursJson = JSON.stringify(updateOpenHours)

    const params = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updateOpenHoursJson
    }

    return fetch(`http://localhost:5000/openhours/${id}`, params)
        .then(response => { return response.json() })
        .then(data => data)
        .catch(() => false)
}