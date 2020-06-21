class contactsController {
    constructor() {
        this.userRepository = new UserRepository();
        this.contactsRepository = new contactsRepository();

        $.get("views/contacts.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data) {
        this.contacten = $(data);

        this.contacten.find("#a").on("click", () => app.loadController(CONTROLLER_ADD));
        this.contacten.find("#b").on("click", () => app.loadController(CONTROLLER_CHANGE));

        this.fetch();

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.contacten);

    }

    async fetch() {
        var idUser;

        try{
            const id = await this.userRepository.get(sessionManager.get("username"));

            const firstReplace = JSON.stringify(id).replace(/\[\{\"id\"\:/, " ");
            idUser = firstReplace.replace(/\}\]/, " ");

            try {
                const data = await this.contactsRepository.get(idUser);

                console.log(data);

                const contactsTable = $("#contactsList");
                data.forEach((data) => {
                    let newContactRow = "<tr>";
                    newContactRow += `<th>${data.name}</th>`;
                    newContactRow += `<td>${data.residence}</td>`;
                    newContactRow += `<td>${data.telephoneNr}</td>`;
                    newContactRow += `<td>${data.canDrive}</td>`;
                    newContactRow += `<td>${data.canMeet}</td>`;
                    newContactRow += `<td>${data.medical}</td>`;
                    newContactRow += `<td>${data.computer}</td>`;
                    newContactRow += `<td>${data.description}</td>`;
                    newContactRow += "</tr>";

                    contactsTable.append(newContactRow)
                });

            }catch (e) {
                console.log(e);
            }
        }catch (e) {
            console.log(e);
        }

    }

    error() {
        $(".content").html("Failed to load the contact page!");
    }


}