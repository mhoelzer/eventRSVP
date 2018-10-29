const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
let mongoose = require("mongoose");

const app = express();
app.set("view engine", "pug");

const publicPath = "public/";
const port = 3000;
app.use(express.static(publicPath));
app.use(express.json());

let database = mongoose.connection;
database.on("error", console.error.bind(console, "Connection Error: "));
database.once("open", () => {
    // we're connected!!!
});
// connection url
const url = "mongodb://localhost:27017";
const databaseName = "rsvp";
mongoose.connect(`mongodb://localhost/${databaseName}`);


let guestSchema = new mongoose.Schema ({
    name: String,
    email: String,
    rsvpStatus: String,
    guests: Number
});
let Response = mongoose.model("Response", guestSchema);

app.get("/", (request, response) => {
    response.render("attendanceForm");
});

app.get("thanks", (request, response) => {
    response.render("thanks");
});

app.post("thanks", (request, response) => {
    response.render("thanks");
});

function newGuestSchema() {
    let newGuest = new Response ({
        name: name,
        email: email,
        rsvpStatus: rsvpStatus,
        guests: guests
    });
    newGuest.save((err, newGuest) => {
        if(err) return console.error(`${err}`);
        console.log(`it's ya boi, ${newGuest.name}`)
    });
};

app.listen(port, console.log(`Listening on port ${port}!`));