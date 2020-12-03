import { auth, db } from "../services/firebase";
export function signup(newUser) {
  console.log("sd");
  let { password, email } = newUser;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((registeredUser) => {
      console.log(registeredUser.user.id);
      db.ref("users").push({
        uid: registeredUser.user.uid,
        username: newUser.username,
        picUrl:
          "https://www.diretoriodigital.com.br/wp-content/uploads/2013/05/765-default-avatar.png",
        phoneNumber: newUser.phoneNumber,
        email: newUser.email
      });
    });
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}
export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}
