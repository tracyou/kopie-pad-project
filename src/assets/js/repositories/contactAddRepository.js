class contactAddRepository {

    constructor() {
        this.route = "/contact"
    }

    async login(username, password) {
        return await networkManager
            .doRequest(`${this.route}`, {"contactName": contactName, "contactResidence" : contactResidence,
            "contactDescription" : contactDescription, "contactPhoneNumber":contactPhoneNumber,
                "contactQualityMedical": contactQualityMedical, "contactQualityComputer": contactQualityComputer,
                "contactQualitySocial": contactQualitySocial, "contactQualityDriver": contactQualityDriver,});
    }
}