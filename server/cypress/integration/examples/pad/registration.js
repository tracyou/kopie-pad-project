describe("Registration", function () {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
            cy.get(".proceedbtn").click();
    });

    it("Valid login form", function() {
        //Find the field for the username, check if it exists.
        cy.get("#name").should("exist");

        //Find the field for the password, check if it exists.
        cy.get("#password1").should("exist");

        //Find the field for the password, check if it exists.
        cy.get("#password2").should("exist");

        //Find the button to login, check if it exists.
        cy.get("#login-btn").should("exist");
    });

    it("Successful registration", function () {
        cy.server();

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested
        //Give the stub the alias: @login
        cy.route("POST", "/user/registration", {"username": "testRegister"}).as("registration");

        //Find the field for the username and type the text "test".
        cy.get("#name").type("testRegister");

        //Find the field for the password and type the text "test".
        cy.get("#password1").type("testRegister");

        //Find the field for the password and type the text "test".
        cy.get("#password2").type("testRegister");

        //Find the button to login and click it.
        cy.get("#login-btn").click();

        //Wait for the @login-stub to be called by the click-event.
        cy.wait("@registration");

        //The @login-stub is called, check the contents of the incoming request.
        cy.get("@registration").should((xhr) => {
            //The username should match what we typed earlier
            expect(xhr.request.body.username).equals("testRegister");

            //The password should match what we typed earlier
            expect(xhr.request.body.password).equals("testRegister");
        });

        // //After a successful login, the URL should now contain #welcome.
        // cy.url().should("contain", "#welcome");
    });
});