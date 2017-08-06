const app = require('../../express');
var postModel = require('../model/post/post.model.server');

app.post("/api/user/:userId/car/:carId/post", createPost);
app.get("/api/search/allPosts", findAllPosts);
app.get("/api/search/keyword/:keyword", findPostsByKeyword);
app.get("/api/user/:userId/post", findAllPostsForUser);
app.get("/api/post/:postId", findPostById);
app.delete("/api/user/:userId/car/:carId/post/:postId", deletePost);
app.put("/api/post/:postId", updatePost);

function findAllPosts(req, res) {
    postModel
        .findAllPosts()
        .then(function (posts) {
            res.json(posts);
        });
}

function findPostsByKeyword(req, res) {
    var keyword = req.params['keyword'];
    postModel
        .findPostsByKeyword(keyword)
        .then(function (posts) {
            res.json(posts);
        });
}

function findAllPostsForUser(req, res) {
    postModel
        .findAllPostsForUser(req.params.userId)
        .then(function (posts) {
            res.json(posts);
        });
}

function createPost(req, res) {
    var post = req.body;
    var userId = req.params['userId'];
    var carId = req.params['carId'];
    postModel
        .createPost(userId, carId, post)
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
    var carId = req.params['carId'];
    postModel
        .deletePost(userId, carId, postId)
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
