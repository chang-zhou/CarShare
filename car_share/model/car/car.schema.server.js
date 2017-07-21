var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    type: {type: String, enum: ['SUV', 'COUPE', 'SEDAN', 'LUXURY', 'MINIVAN']},
    name: String,
    description: String,
    year: String,
    make: String,
    model: String,
    url: String,
    capacity: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'car'});

module.exports = carSchema;