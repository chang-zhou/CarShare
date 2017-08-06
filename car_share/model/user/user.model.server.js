var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

userModel.addPost = addPost;
userModel.deletePost = deletePost;

userModel.addCar = addCar;
userModel.deleteCar = deleteCar;

userModel.addHistory = addHistory;
userModel.deleteHistory = deleteHistory;

module.exports = userModel;

function deletePost(userId, postId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.posts.indexOf(postId);
            user.posts.splice(index, 1);
            return user.save();
        });
}

function addPost(userId, postId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.posts.push(postId);
            return user.save();
        });
}

function deleteCar(userId, carId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.cars.indexOf(carId);
            user.cars.splice(index, 1);
            return user.save();
        });
}

function addCar(userId, carId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.cars.push(carId);
            return user.save();
        });
}

function deleteHistory(userId, historyId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.histories.indexOf(historyId);
            user.histories.splice(index, 1);
            return user.save();
        });
}

function addHistory(userId, historyId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.histories.push(historyId);
            return user.save();
        });
}

function createUser(user) {
    user.role = 'USER';
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}