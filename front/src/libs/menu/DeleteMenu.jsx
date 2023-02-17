export default async function DeleteMenu(id) {

    return fetch(`http://localhost:5000/menu/remove/${id}`)
        .then(response => { return response.json() })
        .then(data => data)

}