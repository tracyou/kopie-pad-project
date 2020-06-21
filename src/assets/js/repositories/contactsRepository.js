class contactsRepository {
    constructor() {
        this.route = "/contacts"
    }

    async get(userId) {
        return await networkManager
            .doRequest(`${this.route}/loading`, {"userId": userId});
    }
}