export default async function UpdateDish(form, id) {

    console.log(form);
    const updateDish = {
        type: form.type.value,
        name: form.name.value,
        price: Number(form.price.value)
    }

    const updateDishJson = JSON.stringify(updateDish)

    const params = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updateDishJson
    }

    return fetch(`http://localhost:5000/dish/${id}`, params)
        .then(response => { return response.json() })
        .then(data => data)
        .catch(() => false)
}