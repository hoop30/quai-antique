export default async function GetOpenHours() {

    return fetch('http://localhost:5000/openhours')
        .then(response => { return response.json() })
        .then(data => data)
}