import firebase from "firebase"

const config = {
  apiKey: "AIzaSyB0S8KCH8A7O4wxn7aLI7YMk3PWVLW-mO0",
  authDomain: 'smovies-48837.firebaseapp.com',
  databaseURL: 'https://smovies-48837-default-rtdb.europe-west1.firebasedatabase.app',
}

firebase.initializeApp(config)

export const auth = firebase.auth
