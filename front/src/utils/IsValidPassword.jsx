export default function IsValidPassword(pasword, pwd, set) {
    // pasword verification
    if (set) {
      if ((pasword.length || pwd.length) < 5) {
          set("6 characters min")
          return false;
        } else if (pasword.value !== pwd.value) {
          set("Passwords do not match")
          return false;
        }
    }
  
    return true
  }
  