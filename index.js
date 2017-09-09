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

app.use(express.static(__dirname + '/public')); // serve out html
app.set("view engine", "ejs");

// Get a reference to the database service
var database = firebase.database();

/**
 * add event to database
 * @param  {string} eventName  [description]
 * @param  {number} creatorUID [description]
 * @param  {Json object} members    keys are the members' uid
 * @param  {string} location   [description]
 * @param  {string} time       [description]
 * @param  {number} numPeople  [description]
 * @param  {string} notes      [description]
 * @param  {string} passcode   [description]
 * @param  {Json object} comments see addComment()
 * @return {[type]}            [description]
 */
function createEvent(eventName, creatorUID, members, location, time, numPeople, description, passcode, comments) {
    database.ref('events/' + eventName).set({
        creatorUID: creatorUID,
        members: members,
        location: location,
        time: time,
        numPeople: numPeople,
        description: description,
        passcode: passcode,
        comments: comments
        });
}

/**
 * identify comment by timestamp 
 * @param {[type]} eventName    [description]
 * @param {[type]} commenterUID [description]
 * @param {[type]} message      [description]
 * @param {[type]} timeStamp    [description]
 */
function addComment(eventName, commenterUID, message, timeStamp) {
    database.ref('events/' + eventName + '/comments/' + Date.now().toString()).set({
        commenterUID: commenterUID,
        message: message
    });
    // console.log(firebase.database.ServerValue.TIMESTAMP)
}

function readName() {
    firebase.database().ref('/users/').once('value').then(function(snapshot) {
        console.log(snapshot.val())
        // ...
    });
}

app.get('/', function (req, res) {
    // res.send('Hello World!')
    res.render("index");
    createEvent('test', 1, 'members', 'location', 'time', 'numPeople', 'description', 'passcode', 'comments');
    addComment('test', 'commenterUID', 'message2', 'timestamp');
})

// create new event
app.get('/new', function(req, res) {
    res.render("new");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})