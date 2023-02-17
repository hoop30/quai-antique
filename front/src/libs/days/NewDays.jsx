export default async function NewDays(form) {

    const newDays = {
        value: form.value.value,
        type: form.type.value,
    }

    const newDaysJson = JSON.stringify(newDays)

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newDaysJson
    }

    return fetch('http://localhost:5000/days', params)
        .then(response => { return response.json() })
        .then(data => {
            if (typeof data === 'string') {
                return data
            }
            return true
        })
        .catch(() => false)
}
