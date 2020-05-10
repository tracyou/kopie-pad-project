class registerRepository {

    constructor() {
        this.route = "/user"
    }

    async register(username, password) {
        return await networkManager
            .doRequest(`${this.route}/registration`, {"username": username, "password": password});
    }

}