
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
        // app.loadController()

        //Set the name in the view from the session
        this.landingspageView.find(".name").html(sessionManager.get("username"));

        //Load registrationpage-content
        const button = this.landingspageView.find("button");
        // $(button).click(function(){
        //     app.loadController(CONTROLLER_REGISTRATION);
            app.loadController(CONTROLLER_LOGIN);
        // });

        this.landingspageView.find("button").on("click", ()=>app.loadController(CONTROLLER_REGISTRATION));

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.landingspageView);

    }

    error() {
        $(".content").html("Failed to load the landingspage!");
    }
}