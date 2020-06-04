class contactUsController{

    constructor() {
        this.contactUsRepository = new contactUsRepository();
        
        $.get("views/contactUs.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data){
        this.contactUs = $(data);
        this.contactUs.find("#sendMsg").on("click", () => this.Checkmsg());
        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contactUs);
    }

    error() {
        $(".content").html("Failed to load content!");
    }

    async Checkmsg(){
        const firstname = this.contactUs.find("#firstname").val();
        const lastname = this.contactUs.find("#lastname").val();
        const contactusemail = this.contactUs.find("#contactusemail").val();
        const contactmessage = this.contactUs.find("#contactmessage").val();

        if (firstname.length === 0 || lastname.length === 0 ||
            contactusemail.length === 0 || contactmessage.length === 0) {
            alert('U heeft niet alle velden ingevuld!');
        } else {
            try {
                await this.contactUsRepository.supportMsg(firstname, lastname, contactusemail,
                    contactmessage);
                alert('Uw bericht is verstuurd!');
            } catch (ex) {
                if (ex.code === 401) {
                    this.contactUs
                        .find(".error")
                        .html(ex.reason);
                }
            }

        }
    }
}