/**
 * Responsible for handling the actions happening on sidebar view
 *
 * @author Lennard Fonteijn, Pim Meijer
 */
class NavbarController {
    constructor() {

        $.get("views/navbar.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called when the navbar.html has been loaded
    setup(data) {
        //Load the sidebar-content into memory
        this.navbar = $(data);

        // this.navbar.find("#login").hide() && this.navbar.find("#loginDivider").hide();

        app.isLoggedIn(() => console.log("ingelogd"),
            () => console.log("uigelogd"));


        // Find all anchors and register the click-event
        this.navbar.find(".dropdown-item").on("click", () => this.handleClickMenuItem());

        // this.navbar.find("#dropdownMenu").on("click", () => this.check());

        //TODO: Add logic here to determine which menu items should be visible or not

        //Empty the sidebar-div and add the resulting view to the page
        $(".sidebar").empty().append(this.navbar);
    }


    handleClickMenuItem() {
        // Get the data-controller from the clicked element (this)
        // const controller = $(this.navbar.find("a")).attr("data-controller");

        // const controller = $(".dropdown-item").each($(".dropdown-item").attr("data-controller"));
        const controller = $("#dropdownMenu a").attr("data-controller");

        console.log($("#dropdownMenu"));
        console.log($("#dropdownMenu a"));
        console.log($("#dropdownMenu a").attr("data-controller"));
        //
        // console.log($("#dropdownMenu a")[0].attr("data-controller");
        // console.log($("#dropdownMenu a")[1].attr("data-controller");
        // console.log($("#dropdownMenu a")[2].attr("data-controller");
        // console.log($("#dropdownMenu a")[3].attr("data-controller");
        // console.log($("#dropdownMenu option:selected"));
        // console.log($("#dropdownMenu option:selected").value);
        // console.log($("#dropdownMenu option:selected").attr("id"));
        // console.log($("#dropdownMenu option:selected").data("id"));
        // console.log($("#dropdownMenu option").attr("id"));


        // console.log("Er is geklikt op " + controller);
        console.log("Er is geklikt");


        //
        // //Pass the action to a new function for further processing
        // app.loadController(controller);
        //
        // //Return false to prevent reloading the page
        return false;
    }

    //Called when the login.html failed to load
    error() {
        $(".content").html("Failed to load the sidebar!");
    }


}
