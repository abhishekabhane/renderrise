const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();

const app = express();
// const path = require('path');

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/services", function(req, res) {
    res.render("services");
});

app.get("/contactus", function(req, res) {
    res.render("contactus");
});

app.get("/Exterior", function(req, res) {
    res.render("Exterior");
});

app.get("/Interior", function(req, res) {
    res.render("Interior");
});

app.post('/send-email', (req, res) => {
    const { floating_first_name, floating_email, floating_message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: floating_email,
        to: process.env.EMAIL_USER,
        subject: `New Inquiry from ${floating_first_name}`,
        text: `Name: ${floating_first_name}\nEmail: ${floating_email}\n\nMessage:\n${floating_message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Something went wrong.');
        }
        res.send('Email sent successfully!');
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log("server has been started.")
});