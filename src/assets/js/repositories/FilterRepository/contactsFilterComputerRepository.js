class contactsFilterComputerRepository {
    constructor() {
        this.route = "/contacts"
    }

    async get(userId) {
        return await networkManager
            .doRequest(`${this.route}/filterComputer`, {"userId": userId});
    }
}