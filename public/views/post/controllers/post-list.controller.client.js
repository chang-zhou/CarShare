(function () {
    angular
        .module('CarShare')
        .controller('postListController', postListController);
    
    function postListController(currentUser,
                                   postService) {
        var model = this;

        model.userId = currentUser._id;

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