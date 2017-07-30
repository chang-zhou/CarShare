var mongoose = require('mongoose');
var carSchema = require('./car.schema.server');
var carModel = mongoose.model('CarModel', carSchema);
var userModel = require('../user/user.model.server');

// api
carModel.createCar = createCar;
carModel.findAllCarsForUser = findAllCarsForUser;
carModel.deleteCar = deleteCar;
carModel.findCarById = findCarById;
carModel.updateCar = updateCar;

carModel.addPost = addPost;
carModel.deletePost = deletePost;
carModel.addHistory = addHistory;
carModel.deleteHistory = deleteHistory;

module.exports = carModel;

function deletePost(carId, postId) {
    return carModel
        .findById(carId)
        .then(function (car) {
            var index = car.posts.indexOf(postId);
            car.posts.splice(index, 1);
            return car.save();
        });
}

function addPost(carId, postId) {
    return carModel
        .findById(carId)
        .then(function (car) {
            car.posts.push(postId);
            return car.save();
        });
}

function deleteHistory(carId, historyId) {
    return carModel
        .findById(carId)
        .then(function (car) {
            var index = car.historys.indexOf(historyId);
            car.historys.splice(index, 1);
            return car.save();
        });
}

function addHistory(carId, historyId) {
    return carModel
        .findById(carId)
        .then(function (car) {
            car.historys.push(historyId);
            return car.save();
        });
}

function createCar(userId, car, carType) {
    car._user = userId;
    car.type = carType;
    return carModel
        .create(car)
        .then(function (car) {
            return userModel
                .addCar(userId, car._id);
        })
}

function findAllCarsForUser(userId) {
    return userModel
        .findById(userId)
        .populate('cars')
        .exec()
        .then(function (user) {
            return user.cars;
        });
}

function deleteCar(userId, carId) {
    return carModel
        .remove({_id: carId})
        .then(function (status) {
            return userModel
                .deleteCar(userId, carId);
        });
}

function findCarById(carId) {
    return carModel.findById(carId);
}

function updateCar(carId, car) {
    return carModel.update({_id: carId}, {$set: car});
}
