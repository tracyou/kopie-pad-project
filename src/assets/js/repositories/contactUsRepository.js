class contactUsRepository{
    constructor() {
        this.route = "/contactUs"
    }

    async supportMsg(firstname, lastname, contactusemail,
              contactmessage) {
        return await networkManager
            .doRequest(`${this.route}`, {"firstname": firstname, "lastname" : lastname,
                "contactusemail" : contactusemail, "contactmessage":contactmessage});

}}