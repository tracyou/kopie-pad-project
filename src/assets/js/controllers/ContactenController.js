class ContactenController{
    constructor(){
        $.get("views/contacten.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }
    setup(data) {
        this.contacten = $(data);

        this.contacten.find("#a").on("click", ()=> app.loadController(CONTROLLER_ADD));
        this.contacten.find("#b").on("click", ()=> app.loadController(CONTROLLER_CHANGE));

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contacten);

    }
    error() {
        $(".content").html("Failed to load the contact page!");
    }
}