class contactAddController {
    constructor() {
        this.contactAddRepository = new contactAddRepository();

        $.get("views/contactAdd.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called wanneer landingspage.html klaar is
    setup(data) {
        this.contactToevoegenView = $(data);
        this.contactToevoegenView.find("#a").on("click", () => this.onCreateContact(event));

        this.contactToevoegenView.find("#a").on("click", ()=> app.loadController(CONTROLLER_CHANGE));
        $(".content").empty().append(this.contactToevoegenView);
    }

    async onCreateContact(event) {
        event.preventDefault();

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

            try {
                await this.contactAddRepository.add(contactName, contactResidence, contactDescription,
                    contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
                    contactQualityDriver);
                alert(contactName + ' is toegevoegd!');
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
    }


    error() {
        $(".content").html("Failed to load the change contact page!");
    }
}