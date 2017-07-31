const app = require('../../express');
var historyModel = require('../model/history/history.model.server');

app.post("/api/user/:userId/car/:carId/renter/:renterId/post/:postId/history", createHistory);
app.get("/api/user/:userId/history", findAllHistoriesForUser);
app.get("/api/car/:carId/history", findAllHistoriesForCar);
app.get("/api/history/:historyId", findHistoryById);

function findAllHistoriesForUser(req, res) {
    historyModel
        .findAllHistoriesForUser(req.params.userId)
        .then(function (histories) {
            res.json(histories);
        });
}

function findAllHistoriesForCar(req, res) {
    historyModel
        .findAllHistoriesForCar(req.params.carId)
        .then(function (histories) {
            res.json(histories);
        });
}

function createHistory(req, res) {
    var history = req.body;
    var userId = req.params.userId;
    var carId = req.params.carId;
    var renterId = req.params.renterId;
    var postId = req.params.postId;
    historyModel
        .createHistory(userId, carId, renterId, postId, history)
        .then(function (history) {
            res.json(history);
        });
}

function findHistoryById(req, res) {
    var historyId = req.params['historyId'];
   historyModel
       .findHistoryById(historyId)
       .then(function (history) {
           res.json(history);
       });
}

