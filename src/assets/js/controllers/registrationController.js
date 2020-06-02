class registrationController {
    constructor() {
        this.registerRepository = new registerRepository();

        $.get("views/registration.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data) {

        this.registration = $(data);
        this.registration.find("button").on("click", () => this.onCreateUser(event));

        // this.registration.find("button").on("click", () => app.loadController(CONTROLLER_LOGIN));

        $(".content").empty().append(this.registration);
    }

    async onCreateUser(event) {
        event.preventDefault();

        const name = this.registration.find("#name").val();
        const password1 = this.registration.find("#password1").val();
        const password2 = this.registration.find("#password2").val();

        if (name.length === 0 || password1.length === 0 || password2.length === 0) {
            alert('U heeft niet alle velden ingevuld!');
        } else if (password1 !== password2) {
            alert('De wachtwoorden die u heeft ingevuld komen niet overeen!');
        } else {
            alert('Het registreren is gelukt!');

            try {
                await this.registerRepository.register(name, password1);

                sessionManager.set("username", name);
                app.loadController(CONTROLLER_LOGIN);
                app.loadController(CONTROLLER_SIDEBAR);
            } catch (e) {
                if (e.code === 401) {
                    this.registration
                        .find(".error")
                        .html(e.reason);
                } else {
                    console.log(e);
                }
            }
        }
    }

    error() {
        $(".content").html("Failed to load the change contact page!");
    }
}