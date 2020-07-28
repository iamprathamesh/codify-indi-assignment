const AgencyService = require('./agency');
const CounterService = require('./counter');
const Client = require('../models/client');

class ClientService {

    constructor() { }

    static saveClientWithAgency(agency, agencyCounterId, client, clientCounterId) {

        return new Promise((resolve, reject) => {
            AgencyService.saveAgency(agency, agencyCounterId).then((agency) => {
                CounterService.findByIdAndUpdate(clientCounterId).then((counter) => {
                    Client.findOneAndUpdate({
                        name: client.name
                    }, {
                        email: client.email,
                        phoneNumber: client.phoneNumber,
                        totalBill: client.totalBill
                    }, {
                        new: true,
                        useFindAndModify: false
                    }, (error, result) => {
                        if (result == null) {
                            client.clientId = counter.sequence_value;
                            client.agencyId = agency.agencyId;
                            client.save(client);
                            Client.findOne({name: client.name}, (err, data) => {
                                if(!err) {
                                    client = data;
                                }
                            });
                        } else {
                            client = result;
                        }

                        resolve({agency, client});
                    });
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = ClientService;