export default async function GetMenu() {

    return fetch(`http://localhost:5000/menu`)
        .then(response => { return response.json() })
        .then(data => data)

}