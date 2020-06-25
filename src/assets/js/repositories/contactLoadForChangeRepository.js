class contactLoadForChangeRepository {

    constructor() {
        this.route = "/contactLoadForChange"
    }

    async get(contactId) {
        return await networkManager
            .doRequest(`${this.route}`, {"contactId": contactId});
    }
}