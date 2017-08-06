(function () {
    angular
        .module('CarShare')
        .controller('searchController', searchController);

    function searchController(currentUser,
                              $location,
                              postService,
                              historyService) {

        var model = this;
        var map, infobox, allposts;

        model.renterId = currentUser._id;

        model.renderPost = renderPost;
        model.reservePost = reservePost;
        model.filterByKeyword = filterByKeyword;

        function init() {
            postService
                .findAllPosts()
                .then(renderPosts);
        }
        init();

        function renderPosts(posts) {
            model.posts = posts;
            allposts = posts;
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

            //Create an infobox at the center of the map but don't show it.
            infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
                visible: false
            });

            //Assign the infobox to a map instance.
            infobox.setMap(map);


            for(i in posts){
                if(posts[i].lat && posts[i].lng){
                    var location = new Microsoft.Maps.Location(posts[i].lat, posts[i].lng);

                    //Create pushpin for post
                    var pin = new Microsoft.Maps.Pushpin(location);

                    //Store some metadata with the pushpin.
                    pin.metadata = {
                        title: posts[i]._car.name,
                        description: 'Price: $' + posts[i].price + '/day'
                    };

                    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

                    //Add the pushpin to the map
                    map.entities.push(pin);
                }
            }
        }

        function pushpinClicked(e) {
            //Make sure the infobox has metadata to display.
            if (e.target.metadata) {
                displayInfobox(e.target);
            }
        }

        function displayInfobox(pushpin) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: pushpin.getLocation(),
                title: pushpin.metadata.title,
                description: pushpin.metadata.description,
                visible: true
            });
        }

        function centerMap(post){
            if(post.lat && post.lng){
                var location = new Microsoft.Maps.Location(post.lat, post.lng);
                map.setView({
                    center: location
                });
            }
        }

        function filterByKeyword(keyword) {
            if(keyword === null || keyword === '' || typeof keyword === 'undefined'){
                return;
            }
            postService
                .findPostsByKeyword(keyword)
                .then(renderPosts);
        }
    }
})();