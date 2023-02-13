export default async function CompareUserEmail(email) {
  
    return fetch(`http://localhost:5000/user?select=${email}`)
        .then(response => {return response.json()})
        .then(data => {
            if (data.length === 0) {
                return true
            }
            return false
        })
}
