(function () {
    angular
        .module('CarShare')
        .controller('profileController', profileController);
    
    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.searchPosts = '#!/search';
        model.myPosts = '#!/user/'+model.userId+'/post';
        model.myCars = '#!/user/'+model.userId+'/car';
        model.myHistory = '#!/user/'+model.userId+'/history';

        model.deleteUser = deleteUser;

        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }
        init();

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