(function () {
    angular
        .module('CarShare')
        .controller('profileController', profileController);
    
    function profileController($location, currentUser, userService) {

        var model = this;

        model.userId = currentUser._id;

        model.searchPosts = '#!/user/'+model.userId+'/search';
        model.myPosts = '#!/user/'+model.userId+'/post';
        model.myCars = '#!/user/'+model.userId+'/car';
        model.myHistory = '#!/user/'+model.userId+'/history';

        model.deleteUser = deleteUser;
        model.updateUser = updateUser;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser (user) {
            model.user = user;
        }

        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(function (status) {
                    $location.url("/login");
                });
        }

        function updateUser() {
            userService
                .updateUser(model.userId, model.user)
                .then(function (status) {
                    $location.url("/user/"+model.userId);
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