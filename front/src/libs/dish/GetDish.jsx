export default async function GetDish() {

    return fetch(`http://localhost:5000/dish`)
        .then(response => { return response.json() })
        .then(data => data)

}