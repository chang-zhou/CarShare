(function () {
    angular
        .module('Carshare')
        .controller('postListController', postListController);
    
    function postListController($routeParams,
                                   postService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            postService
                .findAllPostsForUser(model.userId)
                .then(renderPosts);
        }
        init();

        function renderPosts(posts) {
            model.posts = posts;
        }
    }
})();