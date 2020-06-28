class contactChangeRepository {

    constructor() {
        this.route = "/contactChange"
    }

    async change(contactName, contactResidence, contactDescription,
              contactPhoneNumber, contactQualityMedical, contactQualityComputer, contactQualitySocial,
              contactQualityDriver, contactId, userId) {
        return await networkManager
            .doRequest(`${this.route}`, {"contactName": contactName, "contactResidence" : contactResidence,
                "contactDescription" : contactDescription, "contactPhoneNumber":contactPhoneNumber,
                "contactQualityMedical": contactQualityMedical, "contactQualityComputer": contactQualityComputer,
                "contactQualitySocial": contactQualitySocial, "contactQualityDriver": contactQualityDriver, "contactId": contactId,
            "userId":userId,});
    }
}