var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _car: {type: mongoose.Schema.Types.ObjectId, ref: "CarModel"},
    _renter: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    startDate: Date,
    endDate: Date,
    price: Number,
    address: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'post'});

module.exports = websiteSchema;