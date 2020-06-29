class contactDeleteRepository {

    constructor() {
        this.route = "/contactDelete"
    }

    async delete(contactId, userId) {
        return await networkManager
            .doRequest(`${this.route}`, { "contactId": contactId,
            "userId":userId,});
    }
}