export default function GetUser(set) {

    fetch('http://localhost:5000/user')
        .then(response => { return response.json() })
        .then(data => {
            if (set) {
                set(data)
            }
        })
}
