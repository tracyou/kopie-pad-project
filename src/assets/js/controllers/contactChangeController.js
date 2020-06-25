class contactChangeController {
    constructor() {
        this.userRepository = new UserRepository();
        this.contactLoadForChangeRepository = new contactLoadForChangeRepository();

        $.get("views/contactChange.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called wanneer landingspage.html klaar is
    setup(data) {
        this.contactChangeView = $(data);

        this.contactChangeView.find("#a").on("click", () => this.onCreateContact(event));

        this.fetch();
        $(".content").empty().append(this.contactChangeView);

    }

    async fetch() {
        const contactId = sessionStorage.getItem('contact');

            try {
                const data = await this.contactLoadForChangeRepository.get(contactId);

                console.log(data);

                document.getElementById("#exampleContact").value = `<th>${data.name}</th>`;
                document.getElementById("#exampleWoonplaats").value = `<th>${data.residence}</th>`;
                document.getElementById("#exampleOmschrijving").value = `<th>${data.description}</th>`;
                document.getElementById("#exampleTelefoonnummer").value = `<th>${data.phonenumber}</th>`;

                if(data.canDrive === 1){
                    document.getElementById("#exampleCheck1").value = true;
                } else {
                    document.getElementById("#exampleCheck1").value = false;
                }
                if(data.computer === 1){
                    document.getElementById("#exampleCheck2").value = true;
                } else {
                    document.getElementById("#exampleCheck2").value = false;
                }
                if(data.medical === 1){
                    document.getElementById("#exampleCheck3").value = true;
                } else {
                    document.getElementById("#exampleCheck3").value = false;
                }
                if(data.canMeet === 1){
                    document.getElementById("#exampleCheck4").value = true;
                } else {
                    document.getElementById("#exampleCheck4").value = false;
                }


            }catch (e) {
                console.log(e);
            }
        }



    async onCreateContact(event) {
        event.preventDefault();

        try{
            var idUser;
            const id = await this.userRepository.get(sessionManager.get("username"));
            const firstReplace = JSON.stringify(id).replace(/\[\{\"id\"\:/, " ");
            idUser = firstReplace.replace(/\}\]/, " ");
            console.log(idUser);
        }catch (e) {}

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

            // try {
            //     await this.contactLoadForChangeRepository.add(contactName, contactResidence, contactDescription,
            //         contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
            //         contactQualityDriver);
            //     app.loadController(CONTROLLER_CONTACTEN);
            // } catch (e) {
            //     if (e.code === 401) {
            //         this.contactChange
            //             .find(".error")
            //             .html(e.reason);
            //     } else {
            //         //console.log(e);
            //     }
            // }
        }
    }


    error() {
        $(".content").html("Failed to load the change contact page!");
    }
}