export default async function UpdateMenu(form, id) {

    let dishsId = []

    for (const el of form.Dish.selectedOptions) {
        dishsId.push(el.value)
    }

    const updateMenu = {
        name: form.name.value,
        price: Number(form.price.value),
        type: form.type.value,
        dish: dishsId
    }

    const updateMenuJson = JSON.stringify(updateMenu)

    const params = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updateMenuJson
    }

    return fetch(`http://localhost:5000/menu/${id}`, params)
        .then(response => { return response.json() })
        .then(data => data)
        .catch(() => false)
}