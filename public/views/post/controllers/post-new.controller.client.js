(function () {
    angular
        .module('CarShare')
        .controller('postNewController', postNewController);
    
    function postNewController($routeParams,
                               $location,
                               currentUser,
                               postService,
                               carService) {
        var model = this;

        model.userId = currentUser._id;
        model.carId = $routeParams['carId'];
        model.createPost = createPost;

        function init() {
            postService
                .findAllPostsForUser(model.userId)
                .then(renderPosts);
            carService
                .findCarById(model.carId)
                .then(renderCar);
        }
        init();

        function renderPosts(posts) {
            model.posts = posts;
        }

        function renderPost(post) {
            model.post = post;
        }

        function renderCar(car) {
            model.car = car;
        }

        function createPost(post) {
            if(isEmpty(post.startDate) || isEmpty(post.endDate) || isEmpty(post.price) || isEmpty(post.address) ||
                isEmpty(post.city) || isEmpty(post.state) || isEmpty(post.postCode)) {
                model.error = 'Please provide the required information';
                return;
            }
            postService
                .createPost(model.userId, model.carId, post)
                .then(renderPost)
                .then(function () {
                    $location.url('/post');
                });
        }

        function isEmpty(field){
            return field === null || field === '' || field === 'undefined';
        }
    }
})();