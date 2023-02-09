export default function NewUser(form) {

    const newUser = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    }

    const newUserJson = JSON.stringify(newUser)

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newUserJson
    }

    fetch('http://localhost:5000/user', params)
}
