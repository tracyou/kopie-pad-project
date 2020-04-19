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
            const name = $("#name").val();
            const password1 = $("#password1").val();
            const password2 = $("#password2").val();

            if (name.length == 0 || password1.length == 0 || password2.length == 0){
                alert('U heeft niet alle velden ingevuld!');
            }else if (password1 !== password2){
                alert('De wachtwoorden die u heeft ingevuld komen niet overeen!');
            }else{
                alert('Het registreren is gelukt!');
            }
        });


        $(".content").empty().append(this.registrationView);
    }
}