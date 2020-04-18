// const mysql = require('mysql');
//
// const con = mysql.createConnection({
//     "host": "db.hbo-ict.cloud",
//     "timeout": 30000,
//     "username": "pad_bsc_6",
//     "password": "W1Q8aLy8Wf4BykJH",
//     "database": "pad_bsc_6_dev"
// });

class registrationController {
    constructor(){

        $.get("views/registration.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data) {
        this.registrationView = $(data);

        const button = this.registrationView.find("a");
        $(button).click(function(){
            const registrationName = document.getElementById("username").value = " ";
            console.log(registrationName);
            // const registrationPassword1 = this.registrationView.find("[name='password1']").val();
            // const registrationPassword2 = this.registrationView.find("[name='password2']").val();
            //
            // if (registrationPassword1 !== registrationPassword2){
            //     alert('De wachtwoorden die u heeft ingevuld komen niet overeen!');
            // }else if (registrationName.length == 0 || registrationPassword1.length == 0 || registrationPassword2.length == 0){
            //     alert('U heeft niet alle velden ingevuld!');
            // }
        });

        // this.registrationView.find(".container").on("submit", (e) => this.handleRegistration(e));


        $(".content").empty().append(this.registrationView);
    }

    // async handleRegistration(){
    //
    //     const registrationName = this.registrationView.find("[id='name']").val();
    //     const registrationPassword1 = this.registrationView.find("[id='password1']").val();
    //     const registrationPassword2 = this.registrationView.find("[id='password2']").val();
    //
    //     if (registrationPassword1 !== registrationPassword2){
    //         alert('De wachtwoorden die u heeft ingevuld komen niet overeen!');
    //     }else if (registrationName.length == 0 || registrationPassword1.length == 0 || registrationPassword2.length == 0){
    //         alert('U heeft niet alle velden ingevuld!');
    //     }
    // }

        // function registration() {
        //     const name = $("#name").val();
        //     const password1 = $("#password1").val();
        //     const password2 = $("#password2").val();
        //
        //     if (password1 !== password2){
        //         alert('De wachtwoorden die u heeft ingevuld komen niet overeen!');
        //     }else if (name.length == 0 || password1.length == 0 || password2.length == 0){
        //         alert('U heeft niet alle velden ingevuld!');
        //     }else {
        //         con.connect(function(err) {
        //             if (err) throw err;
        //             const sql = "INSERT INTO user (username, password) VALUES (name,password1)";
        //             console.log("inserted");
        //         })
        //     }
        // }
}