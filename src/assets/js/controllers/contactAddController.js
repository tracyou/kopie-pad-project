class contactAddController {
    constructor() {
        this.userRepository = new UserRepository();
        this.contactAddRepository = new contactAddRepository();

        $.get("views/contactAdd.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called wanneer landingspage.html klaar is
    setup(data) {
        this.contactToevoegenView = $(data);

        this.contactToevoegenView.find("#a").on("click", () => this.onCreateContact(event));

        $(".content").empty().append(this.contactToevoegenView);
    }

    async onCreateContact(event) {
        event.preventDefault();

        var userId;

        try{
            const id = await this.userRepository.get(sessionManager.get("username"));

            const firstReplace = JSON.stringify(id).replace(/\[\{\"id\"\:/, " ");
            userId = firstReplace.replace(/\}\]/, " ");

            console.log(userId);

        const contactName = this.contactToevoegenView.find("#exampleContact").val();
        const contactResidence = this.contactToevoegenView.find("#exampleWoonplaats").val();
        const contactDescription = this.contactToevoegenView.find("#exampleOmschrijving").val();
        const contactPhoneNumber = this.contactToevoegenView.find("#exampleTelefoonnummer").val();
        const contactQualityMedical = $("#exampleCheck1").is(':checked') ? 1:0 ;
        const contactQualityComputer = $("#exampleCheck2").is(':checked') ? 1:0 ;
        const contactQualitySocial = $("#exampleCheck3").is(':checked') ? 1:0 ;
        const contactQualityDriver = $("#exampleCheck4").is(':checked') ? 1:0 ;

        if (contactName.length === 0 || contactResidence.length === 0 ||
            contactDescription.length === 0 || contactPhoneNumber.length === 0) {
            this.contactToevoegenView.find("#errorToevoegen").html("U bent iets vergeten in te voeren.");
        } else if(contactPhoneNumber.length > 10){
            this.contactToevoegenView.find("#errorToevoegen").html("U heeft geen juiste telefoonnummer ingevoerd.");
        } else {
            console.log(contactName);
            console.log(contactResidence);
            console.log(contactDescription);
            console.log(contactPhoneNumber);

            console.log(contactQualityMedical);
            console.log(contactQualityComputer);
            console.log(contactQualitySocial);
            console.log(contactQualityDriver);

            console.log(userId);

            try {
                await this.contactAddRepository.add(contactName, contactResidence, contactDescription,
                    contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
                    contactQualityDriver, userId);
                app.loadController(CONTROLLER_CONTACTEN);
            } catch (e) {
                if (e.code === 401) {
                    this.contactAdd
                        .find(".error")
                        .html(e.reason);
                } else {
                    //console.log(e);
                }
            }
        }

        } catch(e) {
            // If unauthorized error show error to user.
            if(e.code === 401) {
                this.login
                    .find(".error")
                    .html(e.reason);
            } else {
                console.log(e);
            }
        }
    }
    
    error() {
        $(".content").html("Failed to load the change contact page!");
    }
}