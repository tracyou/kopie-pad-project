class contactUsRepository{
    constructor() {
        this.route = "/contactUs"
    }

    async supportMsg(firstName, lastName, contactUsEmail,
              contactMessage) {
        return await networkManager
            .doRequest(`${this.route}`, {"firstname": firstName, "lastname" : lastName,
                "contactusemail" : contactUsEmail, "contactmessage":contactMessage});

}}