class registerRepository {

    constructor() {
        this.route = "/user"
    }

    async register(username, password) {
        return await networkManager
            .doRequest(`${this.route}`, {"username": username, "password": password});
    }

}