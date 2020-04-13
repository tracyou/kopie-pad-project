const mysql = require('mysql');

const con = mysql.createConnection({
    "host": "db.hbo-ict.cloud",
    "timeout": 30000,
    "username": "pad_bsc_6",
    "password": "W1Q8aLy8Wf4BykJH",
    "database": "pad_bsc_6_dev"
});

function registrationController() {
    const name = $("#name").val();
    const password1 = $("#password1").val();
    const password2 = $("#password2").val();

    if (password1 !== password2){
        alert('De wachtwoorden die u heeft ingevuld komen niet overeen!');
    }else if (name.length == 0 || password1.length == 0 || password2.length == 0){
        alert('U heeft niet alle velden ingevuld!');
    }else {
        con.connect(function(err) {
            if (err) throw err;
            const sql = "INSERT INTO user (username, password) VALUES (name,password1)";
            console.log("inserted");
        })
    }
}