export default async function UpdateUser(form, email) {

        const updateUser = {
            currentmail: email,
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            info: form.info.value
        }
        console.log(updateUser);
        const updateUserJson = JSON.stringify(updateUser)

        const params = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: updateUserJson
        }


        return fetch('http://localhost:5000/user', params)
            .then(response => {return response.json()})
            .then(data => {
                console.log(data);
                if (typeof data === 'string') {
                    return data
                }
                return true
            })
            .catch(() => false)
}
