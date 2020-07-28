const express = require('express');
const mongoose = require('mongoose');
const Agency = require('../models/agency');
const Client = require('../models/client');
const AgencyService = require('../services/agency');
const ClientService = require('../services/client');
const router = express.Router();

router.post('/addAgencyAndClient', (req, res, next) => {

    const agency = new Agency({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.agencyDetails.name,
        address1: req.body.agencyDetails.address1,
        address2: req.body.agencyDetails.address2,
        state: req.body.agencyDetails.state,
        city: req.body.agencyDetails.city,
        phoneNumber: req.body.agencyDetails.phoneNumber
    });

    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        agencyId: null,
        name: req.body.clientDetails.name,
        email: req.body.clientDetails.email,
        phoneNumber: req.body.clientDetails.phoneNumber,
        totalBill: req.body.clientDetails.totalBill
    });

    ClientService.saveOrUpdateClient(agency, client).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        throw error;
    });
});

module.exports = router;