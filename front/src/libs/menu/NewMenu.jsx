export default async function NewMenu(form) {

    let dishsId = []

    for (const el of form.Dish.selectedOptions) {
        dishsId.push(el.value)
    }

    const newMenu = {
        name: form.name.value,
        price: Number(form.price.value),
        type: form.type.value,
        dish: dishsId
    }

    const newMenuJson = JSON.stringify(newMenu)

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newMenuJson
    }

    return fetch('http://localhost:5000/menu', params)
        .then(response => { return response.json() })
        .then(data => {
            if (typeof data === 'string') {
                return data
            }
            return true
        })
        .catch(() => false)
}
