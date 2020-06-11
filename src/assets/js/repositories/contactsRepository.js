class contactsRepository {
    constructor() {
        this.route = "/contacts"
    }

    async get(contactName, contactResidence, contactDescription,
              contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
              contactQualityDriver) {
        return await networkManager
            .doRequest(`${this.route}/loading`, {"contactName": contactName, "contactResidence" : contactResidence,
                "contactDescription" : contactDescription, "contactPhoneNumber":contactPhoneNumber,
                "contactQualityMedical": contactQualityMedical, "contactQualityComputer": contactQualityComputer,
                "contactQualitySocial": contactQualitySocial, "contactQualityDriver": contactQualityDriver,});
    }
}