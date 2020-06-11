class contactsController {
    constructor() {
        this.contactsRepository = new contactsRepository();

        $.get("views/contacts.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data) {
        this.contacten = $(data);

        this.contacten.find("#a").on("click", () => app.loadController(CONTROLLER_ADD));
        this.contacten.find("#b").on("click", () => app.loadController(CONTROLLER_CHANGE));

        this.fetch();

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contacten);

    }

    async fetch(contactName, contactResidence, contactDescription,
                contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
                contactQualityDriver) {
        try {
            const data = this.contactsRepository.get(contactName, contactResidence, contactDescription,
                contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
                contactQualityDriver);

            console.log(data);
        }catch (e) {
            console.log(e);
        }
    }

    error() {
        $(".content").html("Failed to load the contact page!");
    }


}