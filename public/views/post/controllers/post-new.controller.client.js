(function () {
    angular
        .module('CarShare')
        .controller('postNewController', postNewController);
    
    function postNewController($routeParams,
                                   $location,
                                   postService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createPost = createPost;

        function init() {
            model.posts = postService
                .findAllPostsForUser(model.userId)
                .then(renderPosts);
        }
        init();

        function renderPosts(posts) {
            model.posts = posts;
        }

        function renderPost(post) {
            model.post = post;
        }

        function createPost(post) {
            postService
                .createPost(model.userId, post)
                .then(renderPost)
                .then(function () {
                    $location.url('/user/'+model.userId+'/post');
                });
        }
    }
})();