const express = require('express');
const mongoose = require('mongoose');
const Agency = require('../models/agency');
const Counter = require('../models/counter');
const router = express.Router();

router.post('/add', (req, res, next) => {
    const counter = new Counter({
        _id: "agencyId"
    });

    Counter.findByIdAndUpdate({
        _id: counter._id
    }, {
        $inc: { sequence_value: 1 }
    }, {
        new: true
    }, (err, result) => {
        if(err) {
            res.status(500).json({
                message: "Something went wrong"
            })
        } else {
            const agency = new Agency({
                _id: new mongoose.Types.ObjectId(),
                agencyId: result.sequence_value,
                name: "Test",
                address1: "Test",
                address2: null,
                state: "Test",
                city: "Test",
                phoneNumber: 1231231230
            });
        
            agency.save();

            res.status(200).json(agency);
        }
    });
});

module.exports = router;