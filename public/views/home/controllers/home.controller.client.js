(function () {
    angular
        .module('CarShare')
        .controller('homeController', homeController);

    function homeController($location, currentUser) {

        var model = this;

        model.currentUser = currentUser;
        model.search = search;

        function search(keyword) {
            if(model.currentUser._id){
                $location.url('/search');
            }
            else{
                $location.url('/guest-search');
            }
        }

    }
})();