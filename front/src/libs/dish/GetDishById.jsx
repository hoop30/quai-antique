export default async function GetDishById(id) {

    return fetch(`http://localhost:5000/dish/${id}`)
        .then(response => { return response.json() })
        .then(data => data)

}