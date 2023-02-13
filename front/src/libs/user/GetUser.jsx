export default async function GetUser(email, password) {

    return fetch(`http://localhost:5000/user?email=${email}&pdw=${password}`)
        .then(response => { return response.json() })
        .then(data => data)

    // fetch('http://localhost:5000/user')
    //     .then(response => { return response.json() })
    //     .then(data => {
    //         if (set) {
    //             set(data)
    //         }
    //     })
}
