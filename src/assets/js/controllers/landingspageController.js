
class landingspageController{
    constructor(){

        $.get("views/landingspage.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }
    //Called wanneer landingspage.html klaar is
    setup(data) {
        //Load the landingspage-content into memory
        this.landingspageView = $(data);

        //Set the name in the view from the session
        this.landingspageView.find(".name").html(sessionManager.get("username"));

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.landingspageView);


    }

    error() {
        $(".content").html("Failed to load the landingspage!");
    }
}