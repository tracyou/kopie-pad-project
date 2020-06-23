class contactLoadForChangeRepository {

    constructor() {
        this.route = "/loadChange"
    }

    async get(contactName, contactResidence, contactDescription,
              contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
              contactQualityDriver) {
        return await networkManager
            .doRequest(`${this.route}`, {"contactName": contactName, "contactResidence" : contactResidence,
                "contactDescription" : contactDescription, "contactPhoneNumber":contactPhoneNumber,
                "contactQualityMedical": contactQualityMedical, "contactQualityComputer": contactQualityComputer,
                "contactQualitySocial": contactQualitySocial, "contactQualityDriver": contactQualityDriver,});
    }
}