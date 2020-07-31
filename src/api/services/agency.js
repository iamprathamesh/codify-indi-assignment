const Agency = require("../models/agency");

class AgencyService {

    constructor() { }

    //db.agencies.aggregate([{$lookup: {from: "clients", localField: "_id", foreignField: "agencyId", as: "clients"}}, {$unwind: "$clients"}, {$group: {_id: "$name", clients: {$mergeObjects: "$clients"},  totalBill: {$max: "$clients.totalBill"}}}, {$project: {_id: 0, agencyName: "$_id", clientName: "$clients.name", totalBill: 1}}, {$sort: {totalBill: -1}}, {$limit: 1}])
    static getTopClient() {
        return new Promise((resolve, reject) => {
            Agency.aggregate([{$lookup: {from: "clients", localField: "_id", foreignField: "agencyId", as: "clients"}}, {$unwind: "$clients"}, {$group: {_id: "$name", clients: {$mergeObjects: "$clients"},  totalBill: {$max: "$clients.totalBill"}}}, {$project: {_id: 0, agencyName: "$_id", clientName: "$clients.name", totalBill: 1}}, {$sort: {totalBill: -1}}, {$limit: 1}])
            .exec((error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    static saveAgency(agency) {
        return new Promise((resolve, reject) => {
            resolve(agency.save(agency));
        });
    }

    static findOneAgency(condition) {
        return new Promise((resolve, reject) => {
            Agency.findOne(condition, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }

    static saveOrUpdateAgency(agency) {
        return new Promise((resolve, reject) => {
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
                if (error) {
                    reject(error);
                } else {
                    if (result === null) {
                        AgencyService.saveAgency(agency).then(() => {
                            AgencyService.findOneAgency({ name: agency.name }).then((data) => {
                                agency = data;
                                resolve(agency);
                            }).catch((err) => {
                                reject(err);
                            });
                        });
                    } else {
                        agency = result;
                        resolve(agency);
                    }
                }
            });
        });
    }
}

module.exports = AgencyService;