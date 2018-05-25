import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAVum2bc8MON8-_qx5Elvze13ePegx5n4U",
    authDomain: "tourist-guide-62998.firebaseapp.com",
    databaseURL: "https://tourist-guide-62998.firebaseio.com",
    projectId: "tourist-guide-62998",
    storageBucket: "tourist-guide-62998.appspot.com",
    messagingSenderId: "276975844756"
}

export const firebaseApp = firebase.initializeApp(config);