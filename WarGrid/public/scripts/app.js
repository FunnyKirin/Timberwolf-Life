// Initialize Firebase
var config = {
    apiKey: "AIzaSyCg8q3JPOVremSm5Exz74by1Rsv4ljk970",
    authDomain: "llylly-95353.firebaseapp.com",
    databaseURL: "https://llylly-95353.firebaseio.com",
    storageBucket: "llylly-95353.appspot.com",
    messagingSenderId: "745498047349"
};
firebase.initializeApp(config);

window.onload = function() {
    window.session = new Session();
    window.map = new Map();
};
