export default async function GetOpenHoursById(id) {

    return fetch(`http://localhost:5000/openhours/${id}`)
        .then(response => { return response.json() })
        .then(data => data)

}