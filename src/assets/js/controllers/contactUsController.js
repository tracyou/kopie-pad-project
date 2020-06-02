class contactUsController{

    constructor() {
        $.get('views/contactUs.html')
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data){
        this.contactUs = $(data);
        this.contactUs.find("#sendmsg").on("click", () => this.Check());
        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contactUs);
    }

    error() {
        $(".content").html("Failed to load content!");
    }

    Check(){
        const firstname = this.contactUs.find("#firstname").val();
        const lastname = this.contactUs.find("#lastname").val();
        const email = this.contactUs.find("#email").val();
        const supportmessage = this.contactUs.find("#berichtarea").val();

        if (firstname.length === 0 || lastname.length === 0 ||
            email.length === 0 || supportmessage.length === 0) {
            alert('U heeft niet alle velden ingevuld!');
        } else {
            alert("Uw bericht is verstuurd!")
        }
    }
}