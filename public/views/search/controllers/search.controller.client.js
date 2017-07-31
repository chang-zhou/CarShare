(function () {
    angular
        .module('CarShare')
        .controller('searchController', searchController);

    function searchController($routeParams,
                              $location,
                              postService,
                              historyService) {

        var model = this;

        model.renterId = $routeParams['userId'];

        model.renderPostAndCar = renderPostAndCar;
        model.reservePost = reservePost;

        function init() {
            postService
                .findAllPosts()
                .then(renderPosts);
        }
        init();

        function renderPosts(posts) {
            model.posts = posts;
        }

        function renderPostAndCar(post) {
            model.post = post;
            model.car = post._car;
        }

        function reservePost(post) {
            if(typeof model.renterId === 'undefined' || model.renterId === null || model.renterId === ''){
                model.error = 'Please log in.';
                return;
            }

            if(post === null || post === '' || typeof post === 'undefined') {
                model.error = 'Please choose a car to reserve.';
                return;
            }

            if(typeof post._renter !== 'undefined') {
                model.error = 'Sorry, the car has been reserved by someone else. Please try another car.';
                return;
            }

            var userId = post._user._id;
            var carId = post._car._id;

            historyService
                .createHistory(userId, carId, model.renterId, post)
                .then(function () {
                    model.message = 'You have successfully reserved this car!';
                });
        }




    }
})();