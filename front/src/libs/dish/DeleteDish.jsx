export default async function DeleteDish(id) {

    return fetch(`http://localhost:5000/dish/remove/${id}`)
        .then(response => { return response.json() })
        .then(data => data)

}