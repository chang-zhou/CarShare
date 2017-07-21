const app = require('../../express');
var postModel = require('../model/post/post.model.server');

app.post("/api/user/:userId/post", createPostForUser);
app.get("/api/user/:userId/post", findAllPostsForUser);
app.get("/api/post/:postId", findPostById);
app.delete("/api/user/:userId/post/:postId", deletePost);
app.put("/api/post/:postId", updatePost);

function findAllPostsForUser(req, res) {
    postModel
        .findAllPostsForUser(req.params.userId)
        .then(function (posts) {
            res.json(posts);
        });
}

function createPostForUser(req, res) {
    var post = req.body;
    var userId = req.params['userId'];
    postModel
        .createPostForUser(userId, post)
        .then(function (post) {
            res.json(post);
        });
}

function findPostById(req, res) {
    var postId = req.params['postId'];
    postModel
        .findPostById(postId)
        .then(function (post) {
            res.json(post);
        });
}

function deletePost(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];
    postModel
        .deletePostFromUser(userId, postId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updatePost(req, res) {
    var postId = req.params['postId'];
    var post = req.body;
    postModel
        .updatePost(postId, post)
        .then(function (status) {
            res.sendStatus(200);
        });
}
