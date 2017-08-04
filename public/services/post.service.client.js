(function () {
    angular
        .module('CarShare')
        .service('postService', postService);
    
    function postService($http, $sce) {
        this.createPost = createPost;
        this.findAllPostsForUser = findAllPostsForUser;
        this.findPostById = findPostById;
        this.deletePost = deletePost;
        this.updatePost = updatePost;
        this.findAllPosts = findAllPosts;

        function findAllPosts() {
            var url = "/api/search/allPosts";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPost(userId, carId, post) {
            var address = encodeURI(post.address);
            var geoCodeUrl = $sce.trustAsResourceUrl("http://dev.virtualearth.net/REST/v1/Locations/US/" +post.state+"/"
                +post.postCode+"/"+post.city+"/"+address+"?&key=AkCagrbwaijCPR5KWSwq6XMRrlKP1sh4wyJOZjJn1wQSJh7rqLY-tR61wY6328a5");

            return $http.jsonp(geoCodeUrl, {jsonpCallbackParam: 'jsonp'})
                .then(function (response) {
                    var data = response.data;

                    var resourceSets = data.resourceSets;
                    var resourceSet = resourceSets[0];
                    var resources = resourceSet.resources;
                    var resource = resources[0];
                    var coordinates = resource.point.coordinates;

                    post.lat = coordinates[0];
                    post.lng = coordinates[1];

                    var url = "/api/user/"+userId+"/car/"+carId+"/post";
                    return $http.post(url, post)
                        .then(function (response) {
                            return response.data;
                        });
                });
        }
        
        function findPostById(postId) {
            var url = "/api/post/"+postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPostsForUser(userId) {
            var url = "/api/user/"+userId+"/post";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePost(userId, carId, postId) {
            var url = "/api/user/"+userId+"/car/"+carId+"/post/"+postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePost(postId, post){
            var url = "/api/post/"+postId;
            return $http.put(url, post)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();