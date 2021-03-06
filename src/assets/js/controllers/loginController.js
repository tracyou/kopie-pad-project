/**
 * Controller responsible for all events in view and setting data
 *
 * @author Pim Meijer
 */
class LoginController {

    constructor() {
        this.userRepository = new UserRepository();

        $.get('views/login.html')
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called when the login.html has been loaded
    setup(data) {
        //Load the login-content into memory
        this.login = $(data);

        this.login.find(".login-form").on("submit", (e) => this.handleLogin(e));

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.login);
    }

    /**
     * Async function that does a login request via repository
     * @param event
     */
    async handleLogin(event) {
        // Prevent actual submit and page refresh.
        event.preventDefault();

        // Find the username and password.
        const username = this.login.find("[name='username']").val();
        const password = this.login.find("[name='password']").val();
  
        try{
            // Await keyword 'stops' code until data is returned - can only be used in async function.
            const user = await this.userRepository.login(username, password);

            const id = await this.userRepository.get(username);

            const firstReplace = JSON.stringify(id).replace(/\[\{\"id\"\:/, " ");
            const secondReplace = firstReplace.replace(/\}\]/, " ");


            console.log(secondReplace);

            sessionManager.set("username", user.username);
            app.loadController(CONTROLLER_CONTACTEN);
            app.loadController(CONTROLLER_SIDEBAR);

        } catch(e) {
            // If unauthorized error show error to user.
            if(e.code === 401) {
                this.login
                    .find(".error")
                    .html(e.reason);
            } else {
                console.log(e);
            }
        }
    }

    // Called when the login.html failed to load.
    error() {
        $(".content").html("Failed to load content!");
    }
}