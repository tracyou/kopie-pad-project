/**
 * Server application - contains all server config and api endpoints
 *
 * @author Pim Meijer
 */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./utils/databaseHelper");
const cryptoHelper = require("./utils/cryptoHelper");
const corsConfig = require("./utils/corsConfigHelper");
const app = express();

//logger lib  - 'short' is basic logging info
app.use(morgan("short"));

//init mysql connectionpool
const connectionPool = db.init();

//parsing request bodies from json to javascript objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS config - Cross Origin Requests
app.use(corsConfig);

// ------ ROUTES - add all api endpoints here ------
const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;


app.post("/user/login", (req, res) => {
    const username = req.body.username;
    const password = cryptoHelper.getHashedPassword(req.body.password);

    db.handleQuery(connectionPool, {
        query: "SELECT username, password FROM user WHERE username = ? AND password = ?",
        values: [username, password]
    }, (data) => {
        if (data.length === 1) {
            res.status(httpOkCode).json({"username": data[0].username});
        } else {
            //wrong username
            res.status(authorizationErrCode).json({reason: "Verkeerde username of password"});
        }

    }, (err) => res.status(badRequestCode).json({reason: err}));
});

app.post("/user/getId", (req, res) => {
    const username = req.body.username;

    db.handleQuery(connectionPool, {
        query: "SELECT id FROM user WHERE username = ?",
        values: [username]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//dummy data example - rooms
app.post("/room_example", (req, res) => {

    db.handleQuery(connectionPool, {
            query: "SELECT id, username FROM user WHERE id = ?",
            values: [req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );

});

app.post("/user/registration", (req, res) => {
    const username = req.body.username;
    const password = cryptoHelper.getHashedPassword(req.body.password);

    db.handleQuery(connectionPool, {
        query: "INSERT INTO user (username, password) VALUES (?,?)",
        values: [username, password]
    }, (data) => {
        if (data.length === 1) {
            //return just the username for now, never send password back!
            // res.status(httpOkCode).json({"username": data[0].username});
            res.status(httpOkCode).json(data);
            console.log("Regitration went wright")
        } else {
            //wrong username
            res.status(authorizationErrCode).json({reason: "Regitration went wrong"});
        }

    }, (err) => res.status(badRequestCode).json({reason: err}));
});

app.post("/contacts/loading", (req, res) =>{
    const contactName = req.body.contactName;
    const contactResidence = req.body.contactResidence;
    const contactDescription = req.body.contactDescription;
    const contactPhoneNumber = req.body.contactPhoneNumber;
    const contactQualityMedical = req.body.contactQualityMedical;
    const contactQualityComputer = req.body.contactQualityComputer;
    const contactQualitySocial = req.body.contactQualitySocial;
    const contactQualityDriver = req.body.contactQualityDriver;

    /*TODO: Find a way to receive contacts with the right user id*/
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM contact",
        values: [contactName, contactResidence, contactPhoneNumber, contactQualityDriver, contactQualitySocial, contactQualityMedical, contactQualityComputer, contactDescription]
        }, (data) => {
            //just give all data back as json
        console.log(data);
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

app.post("/contactAdd", (req, res) => {
    const contactName = req.body.contactName;
    const contactResidence = req.body.contactResidence;
    const contactDescription = req.body.contactDescription;
    const contactPhoneNumber = req.body.contactPhoneNumber;
    const contactQualityMedical = req.body.contactQualityMedical;
    const contactQualityComputer = req.body.contactQualityComputer;
    const contactQualitySocial = req.body.contactQualitySocial;
    const contactQualityDriver = req.body.contactQualityDriver;

    db.handleQuery(connectionPool, {
            query: "INSERT INTO contact (Name, Residence, TelephoneNr, canDrive, canMeet, Medical, Computer, Description) VALUES (?,?,?,?,?,?,?,?)",
            values: [contactName, contactResidence, contactPhoneNumber, contactQualityDriver, contactQualitySocial, contactQualityMedical, contactQualityComputer, contactDescription]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

app.post("/contactChange", (req, res) => {
    const contactName = req.body.contactName;
    const contactResidence = req.body.contactResidence;
    const contactDescription = req.body.contactDescription;
    const contactPhoneNumber = req.body.contactPhoneNumber;
    const contactQualityMedical = req.body.contactQualityMedical;
    const contactQualityComputer = req.body.contactQualityComputer;
    const contactQualitySocial = req.body.contactQualitySocial;
    const contactQualityDriver = req.body.contactQualityDriver;

    db.handleQuery(connectionPool, {
            query: "UPDATE contact SET Name = contactName, Residence = contactResidence, TelephoneNr = contactPhoneNumber, canDrive = contactQualityDriver, canMeet = contactQualitySocial, Medical = contactQualityMedical, Computer = contactQualityComputer, Description = contactDescription",
            //"WHERE contactID = x",
            values: [contactName, contactResidence, contactPhoneNumber, contactQualityDriver, contactQualitySocial, contactQualityMedical, contactQualityComputer, contactDescription]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

app.post("/contactUs", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const contactusemail = req.body.contactusemail;
    const message= req.body.contactmessage;

    db.handleQuery(connectionPool, {
            query: "INSERT INTO support(firstname, lastname, email, message) VALUES (?,?,?,?)",
            values: [firstname, lastname, contactusemail, message]
        }, (data) => {
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

module.exports = app;

