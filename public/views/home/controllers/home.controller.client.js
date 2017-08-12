(function () {
    angular
        .module('CarShare')
        .controller('homeController', homeController);

    function homeController($location, currentUser, userService) {

        var model = this;

        model.currentUser = currentUser;
        model.search = search;
        model.logout = logout;

        function search(keyword) {
            if(model.currentUser._id){
                $location.url('/search/'+keyword);
            }
            else{
                $location.url('/guest-search/'+keyword);
            }
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

    }
})();