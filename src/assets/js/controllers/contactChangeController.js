class contactChangeController {
    constructor() {
        this.userRepository = new UserRepository();
        this.contactLoadForChangeRepository = new contactLoadForChangeRepository();
        this.contactChangeRepository = new contactDeleteRepository();
        this.contactDeleteRepository = new contactDeleteRepository();

        $.get("views/contactChange.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called wanneer landingspage.html klaar is
    setup(data) {
        this.contactChangeView = $(data);

        this.contactChangeView.find("#a").on("click", () => this.onCreateContact(event));

        this.contactChangeView.find("#b").on("click", ()=> this.onDeleteContact(event));

        this.getContact();
        $(".content").empty().append(this.contactChangeView);

    }

    async getContact() {
        var contactId = sessionStorage.getItem('contact');

        try {
            const contact = await this.contactLoadForChangeRepository.get(contactId);
            console.log(contact);

            contact.forEach((contact) =>{
                this.contactChangeView.find("#exampleContact").val(`${contact.name}`);
               this.contactChangeView.find("#exampleWoonplaats").val(`${contact.residence}`);
                this.contactChangeView.find("#exampleOmschrijving").val(`${contact.description}`);
                this.contactChangeView.find("#exampleTelefoonnummer").val(`${contact.telephoneNr}`);

                // if (contact.medical === 1){
                // $("#exampleCheck1").val(true);
                // }
                // const contactQualityComputer = $("#exampleCheck2").is(':checked') ? 1 : 0;
                // const contactQualitySocial = $("#exampleCheck3").is(':checked') ? 1 : 0;
                // const contactQualityDriver = $("#exampleCheck4").is(':checked') ? 1 : 0;
            });

        } catch (e) {
            console.log("er is een error");
            console.log(e);
        }
    }

    async onCreateContact(event) {
        event.preventDefault();

        var idContact = sessionStorage.getItem('contact');


        try {

            const id = await this.userRepository.get(sessionManager.get("username"));

            const firstReplace = JSON.stringify(id).replace(/\[\{\"id\"\:/, " ");
            const idUser = firstReplace.replace(/\}\]/, " ");

            const contactName = this.contactChangeView.find("#exampleContact").val();
            const contactResidence = this.contactChangeView.find("#exampleWoonplaats").val();
            const contactDescription = this.contactChangeView.find("#exampleOmschrijving").val();
            const contactPhoneNumber = this.contactChangeView.find("#exampleTelefoonnummer").val();
            const contactQualityMedical = $("#exampleCheck1").is(':checked') ? 1 : 0;
            const contactQualityComputer = $("#exampleCheck2").is(':checked') ? 1 : 0;
            const contactQualitySocial = $("#exampleCheck3").is(':checked') ? 1 : 0;
            const contactQualityDriver = $("#exampleCheck4").is(':checked') ? 1 : 0;

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

                console.log(idContact);
                console.log(idUser);

                try {
                    await this.contactChangeRepository.change(contactName, contactResidence, contactDescription,
                        contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
                        contactQualityDriver, idContact, idUser);
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

    async onDeleteContact(event) {
        event.preventDefault();

        var idContact = sessionStorage.getItem('contact');
        try {

            const id = await this.userRepository.get(sessionManager.get("username"));

            const firstReplace = JSON.stringify(id).replace(/\[\{\"id\"\:/, " ");
            const idUser = firstReplace.replace(/\}\]/, " ");

                try {
                    await this.contactDeleteRepository.delete(idContact, idUser);
                    alert("Dit contact is verwijdert.");
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