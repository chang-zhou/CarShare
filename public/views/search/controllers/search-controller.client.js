(function () {
    angular
        .module('CarShare')
        .controller('searchController', searchController);

    function searchController($location, searchService) {

        var model = this;

        // model.login = login;

        // function login(username, password) {
        //     userService
        //         .findUserByCredentials(username, password)
        //         .then(function (found) {
        //             if(found !== null) {
        //                 $location.url('/user/' + found._id);
        //             } else {
        //                 model.message = "sorry, " + username + " not found. please try again!";
        //             }
        //         });
        // }
    }
})();