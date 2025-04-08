const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/services", function(req, res) {
    res.render("services");
});

app.get("/contactus", function(req, res) {
    res.render("contactus");
});

app.get("/Works", function(req, res) {
    res.render("Works");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log("server has been started.")
});