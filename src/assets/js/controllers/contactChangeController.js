class contactChangeController {
    constructor() {
        this.userRepository = new UserRepository();
        this.contactLoadForChangeRepository = new contactLoadForChangeRepository();
        this.contactChangeRepository = new contactChangeRepository();

        $.get("views/contactChange.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called wanneer landingspage.html klaar is
    setup(data) {
        this.contactChangeView = $(data);

        this.contactChangeView.find("#a").on("click", () => this.onCreateContact(event));

        $(".content").empty().append(this.contactChangeView);

    }

    async onCreateContact(event) {
        event.preventDefault();

        const contactId = sessionStorage.getItem('contact');

        try{
            const data = await this.contactLoadForChangeRepository.get(contactId);

            var userId;
            const id = await this.userRepository.get(sessionManager.get("username"));
            const firstReplace = JSON.stringify(id).replace(/\[\{\"id\"\:/, " ");
            userId = firstReplace.replace(/\}\]/, " ");

        const contactName = this.contactChangeView.find("#exampleContact").val();
        const contactResidence = this.contactChangeView.find("#exampleWoonplaats").val();
        const contactDescription = this.contactChangeView.find("#exampleOmschrijving").val();
        const contactPhoneNumber = this.contactChangeView.find("#exampleTelefoonnummer").val();
        const contactQualityMedical = $("#exampleCheck1").is(':checked') ? 1:0 ;
        const contactQualityComputer = $("#exampleCheck2").is(':checked') ? 1:0 ;
        const contactQualitySocial = $("#exampleCheck3").is(':checked') ? 1:0 ;
        const contactQualityDriver = $("#exampleCheck4").is(':checked') ? 1:0 ;

        if (contactName.length === 0 || contactResidence.length === 0 ||
            contactDescription.length === 0 || contactPhoneNumber.length === 0) {
            alert('U heeft niet alle velden ingevuld!');
        } else {
            console.log(contactName);
            console.log(contactResidence);
            console.log(contactDescription);
            console.log(contactPhoneNumber);

            console.log(contactQualityMedical);
            console.log(contactQualityComputer);
            console.log(contactQualitySocial);
            console.log(contactQualityDriver);

            console.log(contactId);
            console.log(userId);

            try {
                await this.contactChangeRepository.change(contactName, contactResidence, contactDescription,
                    contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
                    contactQualityDriver, contactId, userId);
                app.loadController(CONTROLLER_CONTACTEN);
            } catch (e) {
                if (e.code === 401) {
                    this.contactChange
                        .find(".error")
                        .html(e.reason);
                } else {
                    console.log(e);
                }
            }
        }
        } catch (e) {
            if (e.code === 401) {
                this.contactChange
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