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
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public')); // serve out html
app.set("view engine", "ejs");

// Get a reference to the database service
var database = firebase.database();

/**
 * create or update an event
 * @param {[type]} eventName   [description]
 * @param {[type]} creatorUID  [description]
 * @param {[type]} members     [description]
 * @param {[type]} location    [description]
 * @param {[type]} hour        [description]
 * @param {[type]} minute      [description]
 * @param {[type]} ampm        [description]
 * @param {[type]} numPeople   [description]
 * @param {[type]} description [description]
 * @param {[type]} passcode    [description]
 * @param {[type]} comments    [description]
 */
function setEvent(eventName, creatorUID, members, location, hour, minute, ampm, numPeople, description, passcode, comments) {
    database.ref('events/' + eventName).set({
        creatorUID: creatorUID,
        members: members,
        location: location,
        hour: hour,
        minute: minute,
        ampm: ampm,
        numPeople: numPeople,
        description: description,
        passcode: passcode,
        comments: comments
        });
}

// return true if the password was correct, false if it wasn't.
function deleteEvent(eventName, passcode) {
    // TODO BEFORE DEPLOY: DON'T DO PASSWORD CHECKING LIKE THIS. BAD.
    let correctPasscode = 'pw'// todo: retrieve the passcode properly
    if (passcode == correctPasscode) { // todo: update this
        database.ref('events/' + eventName).remove();
        return true;
    }
    return false;
}

/**
 * identify comment by timestamp
 * @param {[type]} eventName    [description]
 * @param {[type]} commenterUID [description]
 * @param {[type]} message      [description]
 * @param {[type]} timeStamp    [description]
 */
function addComment(eventName, commenterUID, message) {
    database.ref('events/' + eventName + '/comments/' + Date.now().toString()).set({
        commenterUID: commenterUID,
        message: message
    });
    // console.log(firebase.database.ServerValue.TIMESTAMP)
}

function readName() {
    firebase.database().ref('/events/').once('value').then(function(snapshot) {
        console.log(snapshot.val());
        // ...
    });
}

app.get('/', function (req, res) {
    // res.send('Hello World!')
    res.render("index");
    // setEvent('test', 1, 'members', 'location', 'time', 'numPeople', 'description', 'passcode', 'comments');
    // addComment('test', 'commenterUID', 'message2', 'timestamp');
    // deleteEvent('test', 'pw')
})

// create new event
app.get('/new', function(req, res) {
    res.render("new");
});

app.get('/events/:id', function(req, res, next) {
    firebase.database().ref('/events/' + req.params.id).once('value').then(function(snapshot) {
        
                var json = snapshot.val();
                
                res.render('singleevent', { description: json["description"], location: json["location"], id: req.params.id});
    });
});

// view the events of the current user
app.get("/myevents", function(req, res){
    var testse = 1;
    firebase.database().ref('/events/').once('value').then(function(snapshot) {

        var testjson = snapshot.val();
        console.log(Object.keys(testjson));

        res.render("myevents", {
            myVar: testjson
        });
    });

});

// ///////
// // Yuxiang's Testing route / stuff
// app.get('/test', function(req, res) {
//     res.render("test");
// });

app.post("/comment/:id", function(req, res){
    var message = req.body.message;
    var commenterUID = req.body.commenterUID;
    
    addComment(req.params.id, commenterUID, message);
    res.redirect("/events/" + req.params.id)
});

// create new event
app.post("/new", function(req, res){
    // console.log(req.body);
    // var name = req.body.name;
    // var numPeople = req.body.numPeople;
    // // test posting to database
    // setEvent(name, 'creatorUID', 'members', 'Toronto', 'time', numPeople, 'description', 'passcode', 'HelloComment');
    // addComment(name, 'commenterUID', 'message2', 'timestamp');
    // setEvent(name, 'creatorUID', 'members', 'location', 'time', numPeople, 'description', 'passcode', 'comments');
    let b = req.body;
    setEvent(b['eventName'], 'Yuxiang Dai', [], b.location, b.hour, b.minute, b.ampm, b.numPeople, b.description, b.passcode, {})
    res.redirect("/new")
});
/////

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
