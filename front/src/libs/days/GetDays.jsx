export default async function GetDays() {

    return fetch('http://localhost:5000/days')
        .then(response => { return response.json() })
        .then(data => data)
}