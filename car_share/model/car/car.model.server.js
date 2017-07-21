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
carModel.reorderCar = reorderCar;

module.exports = carModel;

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

function reorderCar(userId, start, end) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var cars = user.cars;
            var car = cars[start];
            cars.splice(start, 1);
            cars.splice(end, 0, car);
            return user.save();
        });
}