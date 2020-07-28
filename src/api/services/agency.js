const CounterService = require('./counter');
const Agency = require("../models/agency");
const Client = require('../models/client');

class AgencyService {

    constructor() { }

    static saveAgency(agency, agencyCounterId) {
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
                    
                    resolve(agency);
                });
                
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = AgencyService;