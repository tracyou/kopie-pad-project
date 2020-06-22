class contactsFilterDriveRepository {
    constructor() {
        this.route = "/contacts"
    }

    async get(userId) {
        return await networkManager
            .doRequest(`${this.route}/filterDrive`, {"userId": userId});
    }
}