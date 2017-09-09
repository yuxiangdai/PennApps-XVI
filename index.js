var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-kYY6GjxJyLOo5a3WjwWy4Wton330Qqc",
    authDomain: "pennapps-xvi-243c1.firebaseapp.com",
    databaseURL: "https://pennapps-xvi-243c1.firebaseio.com",
    projectId: "pennapps-xvi-243c1",
    storageBucket: "",
    messagingSenderId: "277333402514"
    };
    firebase.initializeApp(config);

const express = require('express')
const app = express()

// Get a reference to the database service
var database = firebase.database();

function writeName(name, number) {
    firebase.database().ref('users/' + name).set({
        number: number,
        name: name
        });
}

app.get('/', function (req, res) {
    res.send('Hello World!')
    writeName('hello', 3)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})