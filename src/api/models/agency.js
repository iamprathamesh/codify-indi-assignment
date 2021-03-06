const mongoose = require('mongoose');

const agency = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: [true, 'Name cannot be empty'] },
    address1: { type: String, required: [true, 'Address1 cannot be empty'] },
    address2: { type: String, required: false },
    state: { type: String, required: [true, 'State cannot be empty'] },
    city: { type: String, required: [true, 'City cannot be empty'] },
    phoneNumber: { type: String, required: [true, 'Phone number cannot be empty'] }
});

module.exports = mongoose.model('agencies', agency);