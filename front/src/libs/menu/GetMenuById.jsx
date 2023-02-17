export default async function GetMenuById(id) {

    return fetch(`http://localhost:5000/menu/${id}`)
        .then(response => { return response.json() })
        .then(data => data)

}