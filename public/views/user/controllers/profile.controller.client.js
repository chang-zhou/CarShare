(function () {
    angular
        .module('CarShare')
        .controller('profileController', profileController);
    
    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.websites = websites;
        model.deleteUser = deleteUser;

        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }
        init();

        function websites() {
            $location.url('/user/' + model.userId + "/website");
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError() {
            model.error = "User not found";
        }

        function deleteUser() {
            userService.deleteUser(model.userId)
                .then(function (status) {
                    $location.url("/login");
                })
        }
    }
})();