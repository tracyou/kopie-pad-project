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

        app.isLoggedIn(() =>
            this.navbar.find("#login").hide() &&
            this.navbar.find("#loginRegistrationDivider").hide() &&
            this.navbar.find("#registration").hide() &&
            this.navbar.find("#registrationHelpDivider").hide(),
            () =>
                this.navbar.find("#helpContactsDivider").hide() &&
                this.navbar.find("#contacts").hide() &&
                this.navbar.find("#contactsLogoutDivider").hide() &&
                this.navbar.find("#logout").hide());


        // Find all anchors and register the click-event
        this.navbar.find("dropdownMenu").on("click", () => this.handleClickMenuItem());

        //TODO: Add logic here to determine which menu items should be visible or not

        //Empty the sidebar-div and add the resulting view to the page
        $(".sidebar").empty().append(this.navbar);
    }


    handleClickMenuItem() {
        // Get the data-controller from the clicked element (this)
        const controller = $(this.navbar.find(".dropdown-item")).attr("data-controller");

        // console.log($("#dropdownMenu a")[0].attr("data-controller");
        // console.log($("#dropdownMenu option:selected"));


        console.log("Er is geklikt op " + controller);
        // console.log("Er is geklikt");

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
