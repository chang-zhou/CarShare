var mongoose = require('mongoose');

var historySchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _car: {type: mongoose.Schema.Types.ObjectId, ref: "CarModel"},
    _renter: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    startDate: Date,
    endDate: Date,
    price: String,
    address: String,
    city: String,
    state: String,
    postCode: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'history'});

module.exports = historySchema;