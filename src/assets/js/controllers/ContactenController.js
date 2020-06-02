class ContactenController{
    constructor(){
        $.get("views/contacten.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }
    setup(data) {
        this.contacten = $(data);
        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contacten);

    }
    error() {
        $(".content").html("Failed to load the contact page!");
    }
}