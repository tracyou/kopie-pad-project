class contactAddRepository {

    constructor() {
        this.route = "/contactAdd"
    }

    async add(contactName, contactResidence, contactDescription,
    contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
    contactQualityDriver, userId) {
        return await networkManager
            .doRequest(`${this.route}`, {"contactName": contactName, "contactResidence" : contactResidence,
            "contactDescription" : contactDescription, "contactPhoneNumber":contactPhoneNumber,
                "contactQualityMedical": contactQualityMedical, "contactQualityComputer": contactQualityComputer,
                "contactQualitySocial": contactQualitySocial, "contactQualityDriver": contactQualityDriver, "userId": userId});
    }
}