export default function NewDish(form) {

    const newDish = {
        type: form.type.value,
        name: form.name.value,
        price: Number(form.price.value)
    }

    const newDishJson = JSON.stringify(newDish)

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newDishJson
    }

    return fetch('http://localhost:5000/dish', params)
        .then(response => { return response.json() })
        .then(data => {
            if (typeof data === 'string') {
                return data
            }
            return true
        })
        .catch(() => false)
}
