var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    year: String,
    make: String,
    model: String,
    condition: String,
    url: String,
    capacity: String,
    carType: String,
    posts: {type: mongoose.Schema.Types.ObjectId, ref: "PostModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'car'});

module.exports = carSchema;