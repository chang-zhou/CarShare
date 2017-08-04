var mongoose = require('mongoose');
var historySchema = require('./history.schema.server');
var historyModel = mongoose.model('HistoryModel', historySchema);
var userModel = require('../user/user.model.server');
var carModel = require('../car/car.model.server');
var postModel = require('../post/post.model.server');

// api
historyModel.createHistory = createHistory;
historyModel.findAllHistoriesForUser = findAllHistoriesForUser;
historyModel.findHistoryById = findHistoryById;
historyModel.findAllHistoriesForCar = findAllHistoriesForCar;

module.exports = historyModel;

function findHistoryById(historyId) {
    return historyModel.findById(historyId);
}

function findAllHistoriesForUser(userId) {
    return historyModel
        .find({_user: userId})
        .populate('_user')
        .populate('_car')
        .exec();
}

function findAllHistoriesForCar(carId) {
    return historyModel
        .find({_car: carId})
        .populate('_user')
        .populate('_car')
        .exec();
}

function createHistory(userId, carId, renterId, postId, history) {
    history._user = userId;
    history._car = carId;
    history._renter = renterId;
    return historyModel
        .create(history)
        .then(function (history) {
            userModel
                .addHistory(userId, history._id);
            userModel
                .addHistory(renterId, history._id);
            carModel
                .addHistory(carId, history._id);
            return postModel
                .reservePost(postId, renterId);
        });
}