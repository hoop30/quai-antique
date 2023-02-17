export default async function UpdateDays(form, id) {

    const updateDays = {
        value: form.value.value,
        type: form.type.value,
    }

    const updateDaysJson = JSON.stringify(updateDays)

    const params = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updateDaysJson
    }

    return fetch(`http://localhost:5000/days/${id}`, params)
        .then(response => { return response.json() })
        .then(data => data)
        .catch(() => false)
}