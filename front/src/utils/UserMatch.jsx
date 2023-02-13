import GetUser from '../libs/user/GetUser'

export default async function UserMatch(form, set) {

    const userToConnect = await GetUser(form.email.value, form.password.value)

    if (set) {
        if (typeof userToConnect != 'string') {
            set('')
            return userToConnect
        }
    }

    set(userToConnect)
}
