export default async function NewOpenHours(form) {

    const newOpenHours = {
        type: form.type.value,
        open: form.open.value,
        close: form.close.value
    }

    const newOpenHoursJson = JSON.stringify(newOpenHours)

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newOpenHoursJson
    }

    return fetch('http://localhost:5000/openhours', params)
        .then(response => { return response.json() })
        .then(data => {
            if (typeof data === 'string') {
                return data
            }
            return true
        })
        .catch(() => false)
}
