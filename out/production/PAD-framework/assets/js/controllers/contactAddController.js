class contactAddController{
    constructor(){

        $.get("views/contactAdd.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }
    //Called wanneer landingspage.html klaar is
    setup(data) {
        this.contactToevoegenView = $(data);

        //Set the name in the view from the session
        this.contactToevoegenView.find(".name").html(sessionManager.get("username"));

        const button = this.contactToevoegenView.find("a");
        $(button).click(function () {
            const contactName = $("#contactname").val();
            const contactResidence = $("#residence").val();
            const contactDescription = $("#description").val();
            const contactPhoneNumber = $("#phonenumber").val();
            const contactQualityMedical = $(".exampleCheck1").val();
            const contactQualityComputer = $(".exampleCheck2").val();
            const contactQualitySocial = $(".exampleCheck3").val();
            const contactQualityDriver = $(".exampleCheck4").val();

            if(contactName.length === 0 || contactResidence.length === 0 ||
                contactDescription.length === 0 || contactPhoneNumber.length === 0){
                alert('U heeft niet alle velden ingevuld!');
            } else {
                alert(contactName + ' is toegevoegd!');

                console.log(contactName);
                console.log(contactResidence);
                console.log(contactDescription);
                console.log(contactPhoneNumber);

                console.log(contactQualityDriver);
                console.log(contactQualitySocial);
                console.log(contactQualityComputer);
                console.log(contactQualityMedical);
                try{
                    await this.contactAddRepository.register(contactName, contactResidence, contactDescription,
                        contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
                        contactQualityDriver);
                } catch(e){
                    if (e.code === 401){
                        this.contactAdd
                            .find(".error")
                            .html(e.reason);
                    } else {
                        console.log(e);
                    }
                }
            }
        })

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contactToevoegenView);
    }

    error() {
        $(".content").html("Failed to load the change contact page!");
    }
}