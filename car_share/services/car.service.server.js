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

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var userId = req.body.userId;
    var carId = req.body.carId;
    var carName = req.body.carName;
    var year = req.body.year;
    var make = req.body.make;
    var model = req.body.model;
    var condition = req.body.condition;
    var capacity = req.body.capacity;
    var carType = req.body.carType;
    var myFile        = req.file;
    var filename      = myFile.filename;     // new file name in upload folder

    var url = '/uploads/'+filename;
    var newCar = {
        name: carName,
        year: year,
        make: make,
        model: model,
        condition: condition,
        capacity: capacity,
        carType: carType,
        url: url
    };
    var callbackUrl   = "/index.html#!/car";
    if(carId === 'default'){
        carModel
            .createCar(userId, newCar)
            .then(function (car) {
                res.redirect(callbackUrl);
            });
    }
    else{
        carModel
            .findCarById(carId)
            .then(function (car) {
                car.url = url;
                car.save();
                res.redirect(callbackUrl+"/"+car._id);
            })
    }


}