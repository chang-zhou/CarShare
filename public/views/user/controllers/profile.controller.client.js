(function () {
    angular
        .module('CarShare')
        .controller('profileController', profileController);
    
    function profileController($location, currentUser, userService) {

        var model = this;

        model.userId = currentUser._id;

        model.searchPosts = '#!/search';
        model.myPosts = '#!/post';
        model.myCars = '#!/car';
        model.myHistory = '#!history';

        model.unregisterUser = unregisterUser;
        model.updateUser = updateUser;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser (user) {
            model.user = user;
        }

        function unregisterUser() {
            userService
                .unregisterUser(model.userId)
                .then(function (status) {
                    $location.url("/login");
                });
        }

        function updateUser() {
            userService
                .updateUser(model.userId, model.user)
                .then(function (status) {
                    $location.url("/profile");
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();