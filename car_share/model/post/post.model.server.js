var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var postModel = mongoose.model('PostModel', postSchema);
var userModel = require('../user/user.model.server');
var carModel = require('../car/car.model.server');

// api
postModel.findAllPosts = findAllPosts;
postModel.createPost = createPost;
postModel.findAllPostsForUser = findAllPostsForUser;
postModel.findAllPostsForCar = findAllPostsForCar;
postModel.deletePost = deletePost;
postModel.findPostById = findPostById;
postModel.updatePost = updatePost;
postModel.reservePost = reservePost;
postModel.findPostsByKeyword = findPostsByKeyword;

module.exports = postModel;

function findPostById(postId) {
    return postModel
        .findById(postId)
        .populate('_car')
        .exec();
}

function updatePost(postId, post) {
    return postModel.update({_id: postId}, {$set: post});
}

function deletePost(userId, carId, postId) {
    return postModel
        .remove({_id: postId})
        .then(function (status) {
            carModel
                .deletePost(carId, postId);
            return userModel
                .deletePost(userId, postId);
        });
}

function findAllPostsForUser(userId) {
    return postModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findAllPostsForCar(carId) {
    return postModel
        .find({_car: carId})
        .populate('_car')
        .exec();
}

function createPost(userId, carId, post) {
    post._user = userId;
    post._car = carId;
    return postModel
        .create(post)
        .then(function (post) {
            carModel
                .addPost(carId, post._id);
            return userModel
                .addPost(userId, post._id);
        });
}

function findAllPosts() {
    return postModel
        .find()
        .populate('_user _car _renter')
        .exec();
}

function reservePost(postId, renterId) {
    return postModel
        .findById(postId)
        .then(function (post) {
            post._renter = renterId;
            return post.save();
        })
}

function findPostsByKeyword(keyword) {
    return postModel
        .find({$or: [{postCode:  keyword}, {city: keyword}]})
        .populate('_user _car _renter')
        .exec();
}