const express = require("express");
let mongoose = require("mongoose");

const app = express();
app.set("view engine", "pug");

const publicPath = "public/";
const port = 3000;
app.use(express.static(publicPath));
app.use(express.urlencoded());

let database = mongoose.connection;
database.on("error", console.error.bind(console, "Connection Error: "));
database.once("open", () => {
    // we're connected!!!
});

const url = "mongodb://localhost:27017";
const databaseName = "rsvp";
mongoose.connect(`mongodb://localhost/${databaseName}`);


let guestSchema = new mongoose.Schema ({
    name: String,
    email: String,
    attending: Boolean,
    guests: Number
});
let biggunGuestSchema = {};
let Response = mongoose.model("Response", guestSchema);

app.get("/", (request, response) => {
    response.render("attendanceForm");
});

app.get("/guests", (request, response) => {
    Response.find((err, guests) => {
        console.log(guests)
        if(err) return console.error(err);
        response.render("guests", {
            attending: guests.filter(guest => guest.attending === true),
            notAttending: guests.filter(guest => guest.attending === false)
        });
    })
});

app.post("/reply", (request, response) => {
    console.log(request.body)
    newGuest = new Response ({
        name: request.body.name,
        email: request.body.email,
        attending: request.body.attending,
        guests: request.body.guests
    });
    newGuest.save((err, newGuest) => {
        if(err) return console.error(`${err}`);
        response.render("reply");
        console.log(`it's ya boi ${newGuest.name}`)
    });
});

app.listen(port, console.log(`Listening on port ${port}!`));