(function () {
    angular
        .module('CarShare')
        .controller('guestSearchController', guestSearchController);

    function guestSearchController(postService) {

        var model = this;
        var map, infobox;

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
            getMap(posts);
        }

        function renderPost(post) {
            model.post = post;
            model.user = post._user;
            model.car = post._car;
            centerMap(post);
        }

        function reservePost(post) {
            model.error = 'Please log in.';
        }

        function getMap(posts) {
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

        function centerMap(post){
            if(post.lat && post.lng){
                var location = new Microsoft.Maps.Location(post.lat, post.lng);
                map.setView({
                    center: location
                });
            }
        }

        function pushpinClicked(e) {
            //Make sure the infobox has metadata to display.
            if (e.target.metadata) {
                //Set the infobox options with the metadata of the pushpin.
                infobox.setOptions({
                    location: e.target.getLocation(),
                    title: e.target.metadata.title,
                    description: e.target.metadata.description,
                    visible: true
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