const mongoose = require('mongoose');

const client = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'agencies' },
    name: { type: String, required: [true, 'Name cannot be empty'] },
    email: { type: String, required: [true, 'Email cannot be empty'] },
    phoneNumber: { type: String, required: [true, 'Phone number cannot be empty'] },
    totalBill: { type: Number, required: [true, 'Total bill cannot be empty'] }
});

module.exports = mongoose.model('clients', client);