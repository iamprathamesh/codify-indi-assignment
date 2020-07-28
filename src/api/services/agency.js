const CounterService = require('./counter');
const Agency = require("../models/agency");
const Client = require('../models/client');

class AgencyService {

    constructor() { }

    static saveAgencyAndClient(agency, agencyCounterId, client, clientCounterId) {
        return new Promise((resolve, reject) => {
            CounterService.findByIdAndUpdate(agencyCounterId).then((counter) => {
                Agency.findOneAndUpdate({
                    name: agency.name
                }, {
                    address1: agency.address1,
                    address2: agency.address2,
                    state: agency.state,
                    city: agency.city,
                    phoneNumber: agency.phoneNumber
                }, {
                    new: true,
                    useFindAndModify: false
                }, (error, result) => {
                    if (result == null) {
                        agency.agencyId = counter.sequence_value;
                        agency.save(agency);
                        Agency.findOne({name: agency.name}, (err, data) => {
                            if(!err) {
                                agency = data;
                            }
                        });
                    } else {
                        agency = result;
                    }
                });


                CounterService.findByIdAndUpdate(clientCounterId).then((counter) => {
                    Client.findByIdAndUpdate({
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
                    });
                }).catch((error) => {
                    reject(error);
                });

                resolve({ agency, client });
                
            }).catch((error) => {
                reject(error);
            });

            

            
            //console.log(JSON.stringify({ agency, client }));
        });
    }
}

module.exports = AgencyService;