class contactsFilterMedicalRepository {
    constructor() {
        this.route = "/contacts"
    }

    async get(userId) {
        return await networkManager
            .doRequest(`${this.route}/filterMedical`, {"userId": userId});
    }
}