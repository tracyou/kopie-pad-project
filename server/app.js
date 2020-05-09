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

    //TODO: We shouldn't save a password unencrypted!! Improve this by using cryptoHelper :)
    const password = req.body.password;

    db.handleQuery(connectionPool, {
        query: "SELECT username, password FROM user WHERE username = ? AND password = ?",
        values: [username, password]
    }, (data) => {
        if (data.length === 1) {
            //return just the username for now, never send password back!
            res.status(httpOkCode).json({"username": data[0].username});
        } else {
            //wrong username
            res.status(authorizationErrCode).json({reason: "Wrong username or password"});
        }

    }, (err) => res.status(badRequestCode).json({reason: err}));
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

    db.handleQuery(connectionPool, {
            // select count(*) id from user;
            query: "SELECT COUNT(*) id FROM user",
        }, (data) => {
            //just give all data back as json
            console.log(data);
            res.status(httpOkCode).json(data);

            const id = data + 1;
            const username = req.body.username;
            const password = req.body.password;

            db.handleQuery(connectionPool, {
                query: "INSERT INTO user (id, username, password) VALUES id = ?, username = ? AND password = ?",
                values: [id, username, password]
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

        }, (err) => res.status(badRequestCode).json({reason: err})
    );


//------- END ROUTES -------
});
module.exports = app;

