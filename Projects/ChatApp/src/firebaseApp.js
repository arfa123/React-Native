import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBCXOOfyopdVQeiR5Cm8H7qLPHnPsWSoBw",
    authDomain: "chatapp-3791c.firebaseapp.com",
    databaseURL: "https://chatapp-3791c.firebaseio.com",
    projectId: "chatapp-3791c",
    storageBucket: "",
    messagingSenderId: "895644656039"
  };
export const firebaseApp = firebase.initializeApp(config);
