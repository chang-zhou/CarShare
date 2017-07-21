const app = require('../../express');
var carModel = require('../model/car/car.model.server');

app.post("/api/user/:userId/car", createCarForUser);
app.get("/api/user/:userId/car", findAllCarsForUser);
app.get("/api/car/:carId", findCarById);
app.delete("/api/user/:userId/car/:carId", deleteCar);
app.put("/api/car/:carId", updateCar);

function findAllCarsForUser(req, res) {
    carModel
        .findAllCarsForUser(req.params.userId)
        .then(function (cars) {
            res.json(cars);
        });
}

function createCarForUser(req, res) {
    var car = req.body;
    var userId = req.params['userId'];
    carModel
        .createCar(userId, car)
        .then(function (car) {
            res.json(car);
        });
}

function findCarById(req, res) {
    var carId = req.params['carId'];
    carModel
        .findCarById(carId)
        .then(function (car) {
            res.json(car);
        });
}

function deleteCar(req, res) {
    var carId = req.params['carId'];
    var userId = req.params['userId'];
    carModel
        .deleteCar(userId, carId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateCar(req, res) {
    var carId = req.params['carId'];
    var car = req.body;
    carModel
        .updateCar(carId, car)
        .then(function (status) {
            res.sendStatus(200);
        });
}
