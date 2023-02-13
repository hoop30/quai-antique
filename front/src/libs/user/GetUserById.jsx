export default function GetUserById(id) {

    return fetch(`http://localhost:5000/user?id=${id}`)
        .then(response => { return response.json() })
        .then(data => data)
}
