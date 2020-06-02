class contactUsRepository{
    constructor() {
        this.route = "/contactUs"
    }

    async add(ContactUsfirstname, ContactUslastname, ContactUsEmail,
              ContactUsMessage) {
        return await networkManager
            .doRequest(`${this.route}`, {"firstname": ContactUsfirstname, "lastname" : ContactUslastname,
                "email" : ContactUsEmail, "message":ContactUsMessage});
}}