(function () {
    angular
        .module('CarShare')
        .controller('guestSearchController', guestSearchController);

    function guestSearchController(postService) {

        var model = this;
        var map;

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
            model.error = 'Please log in.';
        }

        function getMap(posts) {
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