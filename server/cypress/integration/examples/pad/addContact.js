describe("Add a contact to the list", function () {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
            cy.get(".proceedbtn").click();
    });

    it("Valid form", function() {
        //Find the field for the name, check if it exists.
        cy.get("#contactname").should("exist");

        //Find the field for the residence, check if it exists.
        cy.get("#residence").should("exist");

        //Find the field for the description, check if it exists.
        cy.get("#description").should("exist");

        //Find the field for the phone number, check if it exists.
        cy.get("#phonenumber").should("exist");

        //Find the button to save, check if it exists.
        cy.get("#a").should("exist");
    });

    it("Successful registration", function () {
        cy.server();

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested
        //Give the stub the alias: @login
        cy.route("POST", "/user/contactAdd", {"contactname": "testAdd"}).as("contactAdd");

        //Find the field for the username and type the text "test".
        cy.get("#contactname").type("testAdd");

        //Find the field for the password and type the text "test".
        cy.get("#residence").type("testAdd");

        //Find the field for the password and type the text "test".
        cy.get("#description").type("testAdd");

        //Find the field for the password and type the text "test".
        cy.get("#phonenumber").type("testAdd");

        //Find the button to save and click it.
        cy.get("#a").click();

        //Wait for the @login-stub to be called by the click-event.
        cy.wait("@contactAdd");

        //The @login-stub is called, check the contents of the incoming request.
        cy.get("@contactAdd").should((xhr) => {
            //The username should match what we typed earlier
            expect(xhr.request.body.contactname).equals("testAdd");

            //The residence should match what we typed earlier
            expect(xhr.request.body.residence).equals("testAdd");

            //The description should match what we typed earlier
            expect(xhr.request.body.description).equals("testAdd");

            //The phone number should match what we typed earlier
            expect(xhr.request.body.phonenumber).equals("testAdd");
        });

        // //After a successful login, the URL should now contain #welcome.
        // cy.url().should("contain", "#welcome");
    });
});