(function () {
    angular
        .module('CarShare')
        .controller('searchController', searchController);

    function searchController(currentUser,
                              $location,
                              postService,
                              historyService) {

        var model = this;
        var map;

        model.renterId = currentUser._id;

        model.renderPost = renderPost;
        model.reservePost = reservePost;

        function init() {
            postService
                .findAllPosts()
                .then(renderPosts);
        }
        init();

        function renderPosts(posts) {
            model.posts = posts;
            getMap(posts);
        }

        function renderPost(post) {
            model.post = post;
            model.user = post._user;
            model.car = post._car;
            centerMap(post);
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
                model.message = null;
                model.error = 'Sorry, the car has been reserved by someone else. Please try another car.';
                return;
            }

            var userId = post._user._id;
            if(model.renterId === userId){
                model.error = "Sorry, you can't reserve your own car.";
                return;
            }

            var carId = post._car._id;

            historyService
                .createHistory(userId, carId, model.renterId, post)
                .then(renderPostAndCar)
                .then(function () {
                    model.message = 'You have successfully reserved this car!';
                    $location.url('/search');
                });
        }

        function getMap(posts)
        {
            map = new Microsoft.Maps.Map('#bingMap', {
                credentials: 'AkCagrbwaijCPR5KWSwq6XMRrlKP1sh4wyJOZjJn1wQSJh7rqLY-tR61wY6328a5'
            });

            for(i in posts){
                if(posts[i].lat && posts[i].lng){
                    var location = new Microsoft.Maps.Location(posts[i].lat, posts[i].lng);

                    //Create pushpin for post
                    var pin = new Microsoft.Maps.Pushpin(location);

                    //Add the pushpin to the map
                    map.entities.push(pin);
                }
            }
        }

        function centerMap(post){
            if(post.lat && post.lng){
                var location = new Microsoft.Maps.Location(post.lat, post.lng);
                map.setView({
                    center: location
                });
            }
        }

    }
})();