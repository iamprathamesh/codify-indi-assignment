const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const ClientService = require('../services/client');


router.put('/update', (req, res) => {
    const client = new Client({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        totalBill: req.body.totalBill
    });

    ClientService.updateClient(client).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        throw error;
    });
});

module.exports = router;