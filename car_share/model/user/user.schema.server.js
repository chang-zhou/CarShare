var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    google:{
        id: String,
        token: String
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    role: [{type: String, default: 'USER', enum:['USER','ADMIN']}],
    cars: [{type: mongoose.Schema.Types.ObjectId, ref: "CarModel"}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "PostModel"}],
    histories: [{type: mongoose.Schema.Types.ObjectId, ref: "HistoryModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;