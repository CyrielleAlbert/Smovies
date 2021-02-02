import { auth } from '../services/firebase';

export function signup(email, password, dob, address) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth().signOut()
}
export function sendPasswordReset(email, successCallback, errorCallback) {
  auth().sendPasswordResetEmail(email)
    .then(() => { successCallback() })
    .catch((error) => { errorCallback(error) })
}