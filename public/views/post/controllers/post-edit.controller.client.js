(function () {
    angular
        .module('CarShare')
        .controller('postEditController', postEditController);
    
    function postEditController($routeParams,
                                   currentUser,
                                   $location,
                                   postService) {
        var model = this;

        model.userId = currentUser._id;
        model.postId = $routeParams['postId'];
        model.deletePost = deletePost;
        model.updatePost = updatePost;

        function init() {
            model.posts = postService
                .findAllPostsForUser(model.userId)
                .then(renderPosts);
            model.post = postService
                .findPostById(model.postId)
                .then(renderPost);
        }
        init();

        function renderPosts(posts) {
            model.posts = posts;
        }

        function renderPost(post) {
            model.post = post;
        }

        function deletePost() {
            postService
                .deletePost(model.userId, model.post._car, model.postId)
                .then(function (status) {
                    $location.url('/post');
                });
        }

        function updatePost() {
            postService
                .updatePost(model.postId, model.post)
                .then(function (status) {
                    $location.url('/post');
                });
        }
    }
})();