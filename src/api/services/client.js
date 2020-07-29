const AgencyService = require('./agency');
const CounterService = require('./counter');
const Client = require('../models/client');

class ClientService {

    constructor() { }

    static saveClient(client) {
        return new Promise((resolve, reject) => {
            resolve(client.save(client));
        });
    }

    static updateClient(client) {
        return new Promise((resolve, reject) => {
            Client.findByIdAndUpdate(client._id, {
                name: client.name,
                email: client.email,
                phoneNumber: client.phoneNumber,
                totalBill: client.totalBill
            }, {
                new: true,
                useFindAndModify: false
            }, (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static findOneClient(condition) {
        return new Promise((resolve, reject) => {
            Client.findOne(condition, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        })
    }

    static saveOrUpdateClient(agency, client) {

        return new Promise((resolve, reject) => {
            AgencyService.saveOrUpdateAgency(agency).then((agency) => {
                Client.findOneAndUpdate({
                    name: client.name,
                    agencyId: agency._id
                }, {
                    email: client.email,
                    phoneNumber: client.phoneNumber,
                    totalBill: client.totalBill
                }, {
                    new: true,
                    useFindAndModify: false
                }, (error, result) => {
                    if (result === null) {
                        client.agencyId = agency._id;
                        ClientService.saveClient(client).then(() => {
                            ClientService.findOneClient({ name: client.name }).then((data) => {
                                client = data;
                                resolve(client);
                            }).catch((err) => {
                                reject(err);
                            })
                        });
                    } else {
                        client = result;
                    }

                    resolve({ agency, client });
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = ClientService;