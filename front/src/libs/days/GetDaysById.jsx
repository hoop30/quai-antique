export default async function GetDayById(id) {

    return fetch(`http://localhost:5000/days/${id}`)
        .then(response => { return response.json() })
        .then(data => data)

}