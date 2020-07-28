const mongoose = require('mongoose');

const client = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientId: { type: Number, required: [true, 'Client id cannot be null'] },
    agencyId: { type: Number, required: [true, 'Agency id cannot be null'] },
    name: { type: String, required: [true, 'Name cannot be empty'] },
    email: { type: String, required: [true, 'Email cannot be empty'] },
    phoneNumber: { type: Number, required: [true, 'Phone number cannot be empty'] },
    totalBill: { type: Number, required: [true, 'Total bill cannot be empty'] }
});

module.exports = mongoose.model('clients', client);