export default async function IsValidPassword(pasword, pwd, set) {

    // pasword verification
    if (set) {
        if ((pasword.length || pwd.length) < 5) {
            set("6 characters min")
            return false;
        } else if (pasword !== pwd) {
            set("Passwords do not match")
            return false;
        }
    }

    return true
}
