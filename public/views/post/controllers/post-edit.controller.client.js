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
            if(isEmpty(model.post.startDate) || isEmpty(model.post.endDate) || isEmpty(model.post.price) ||
                isEmpty(model.post.address) || isEmpty(model.post.city) || isEmpty(model.post.state) ||
                isEmpty(model.post.postCode)) {
                model.error = 'Please provide the required information';
                return;
            }
            postService
                .updatePost(model.postId, model.post)
                .then(function (status) {
                    $location.url('/post');
                });
        }

        function isEmpty(field){
            return field === null || field === '' || field === 'undefined';
        }
    }
})();