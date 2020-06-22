class contactsFilterMedicalController {
    constructor() {
        this.userRepository = new UserRepository();
        this.contactsFilterMedicalRepository = new contactsFilterMedicalRepository();

        $.get("views/filterViews/contactsMedical.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    setup(data) {
        this.contacten = $(data);

        this.contacten.find("#a").on("click", () => app.loadController(CONTROLLER_ADD));
        this.contacten.find("#b").on("click", () => app.loadController(CONTROLLER_CHANGE));

        this.contacten.find("#volledig").on("click", () => app.loadController(CONTROLLER_CONTACTEN));
        this.contacten.find("#computer").on("click", () => app.loadController(CONTROLLER_FILTER_COMPUTER));
        this.contacten.find("#gezellig").on("click", () => app.loadController(CONTROLLER_FILTER_MEET));
        this.contacten.find("#rijden").on("click", () => app.loadController(CONTROLLER_FILTER_DRIVE));


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
                const data = await this.contactsFilterMedicalRepository.get(idUser);

                console.log(data);

                const contactsTable = $("#contactsList");
                data.forEach((data) => {

                    let qualityDrive = "Nee";
                    let qualityMeet = "Nee";
                    let qualityMedical = "Nee";
                    let qualityComputer = "Nee";
                    if(data.canDrive === 1){
                        qualityDrive = "Ja";
                    }
                    if(data.canMeet === 1){
                        qualityMeet = "Ja";
                    }
                    if (data.medical === 1){
                        qualityMedical = "Ja";
                    }
                    if (data.computer === 1){
                        qualityComputer = "Ja";
                    }

                    let newContactRow = "<tr>";
                    newContactRow += `<th>${data.name}</th>`;
                    newContactRow += `<td>${data.residence}</td>`;
                    newContactRow += `<td>${data.telephoneNr}</td>`;
                    newContactRow += `<td>${qualityComputer}</td>`;
                    newContactRow += `<td>${qualityDrive}</td>`;
                    newContactRow += `<td>${qualityMedical}</td>`;
                    newContactRow += `<td>${qualityMeet}</td>`;
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