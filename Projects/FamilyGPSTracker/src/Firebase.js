import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBzWiRgeZx9uC9-Ov61V3a0Ej05_omPW4g",
    authDomain: "familytracker-35476.firebaseapp.com",
    databaseURL: "https://familytracker-35476.firebaseio.com",
    projectId: "familytracker-35476",
    storageBucket: "familytracker-35476.appspot.com",
    messagingSenderId: "744358409936"
}

export const firebaseApp = firebase.initializeApp(config);