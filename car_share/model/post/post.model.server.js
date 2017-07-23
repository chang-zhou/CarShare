var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var postModel = mongoose.model('PostModel', postSchema);
var userModel = require('../user/user.model.server');

// api
postModel.findAllPosts = findAllPosts;
postModel.createPostForUser = createPostForUser;
postModel.findAllPostsForUser = findAllPostsForUser;
postModel.deletePostFromUser = deletePostFromUser;
postModel.findPostById = findPostById;
postModel.updatePost = updatePost;

module.exports = postModel;

function findPostById(postId) {
    return postModel.findById(postId);
}

function updatePost(postId, post) {
    return postModel.update({_id: postId}, {$set: post});
}

function deletePostFromUser(userId, postId) {
    return postModel
        .remove({_id: postId})
        .then(function (status) {
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

function createPostForUser(userId, post) {
    post._user = userId;
    return postModel
        .create(post)
        .then(function (post) {
            return userModel
                .addPost(userId, post._id)
        })
}

function findAllPosts() {
    return postModel.find();
}