class contactsFilterMeetRepository {
    constructor() {
        this.route = "/contacts"
    }

    async get(userId) {
        return await networkManager
            .doRequest(`${this.route}/filterMeet`, {"userId": userId});
    }
}