(function () {
    angular
        .module('CarShare')
        .controller('homeController', homeController);

    function homeController($location) {

        var model = this;

        model.search = search;

        function search(keyword) {
            $location.url('/guest-search');
        }

    }
})();