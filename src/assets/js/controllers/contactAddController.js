class contactAddController{
    constructor(){

        $.get("views/contactAdd.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }
    //Called wanneer landingspage.html klaar is
    setup(data) {
        //Load the landingspage-content into memory
        this.contactToevoegenView = $(data);

        //Set the name in the view from the session
        this.contactToevoegenView.find(".name").html(sessionManager.get("username"));

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contactToevoegenView);
    }

    error() {
        $(".content").html("Failed to load the change contact page!");
    }
}