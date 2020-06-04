describe("Registration", function () {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
            cy.get(".proceedbtn").click();
    });

    it("Valid login form", function() {
        cy.get("#name").should("exist");

        cy.get("#password1").should("exist");

        cy.get("#password2").should("exist");

        cy.get("#login-btn").should("exist");
    });

    it("Successful registration", function () {
        cy.server();
        cy.route("POST", "/user/registration", {"username": "testRegister"}).as("registration");

        cy.get("#name").type("testRegister");

        cy.get("#password1").type("testRegister");

        cy.get("#password2").type("testRegister");

        cy.get("#login-btn").click();

        cy.wait("@registration");

        cy.get("@registration").should((xhr) => {
            expect(xhr.request.body.username).equals("testRegister");

            expect(xhr.request.body.password).equals("testRegister");
        });

        //After a successful login, the URL should now contain #welcome.
        cy.url().should("contain", "#login");
    });

    it("Equal password", function () {
        cy.server();

        // cy.route({
        //     method: "POST",
        //     url: "/user/registration",
        //     response: {
        //         reason: "Registration went wrong"
        //     },
        //     status: 401
        // }).as("registration");

        cy.get("#name").type("testRegister");

        cy.get("#password1").type("testRegister");

        cy.get("#password2").type("testRegister2");

        cy.get("#login-btn").click();

        // cy.wait("@registration");

        cy.get(".error").should("contain", "De wachtwoorden die u heeft ingevuld komen niet overeen!");
    });
});