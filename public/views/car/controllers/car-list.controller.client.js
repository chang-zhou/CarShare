(function () {
    angular
        .module('CarShare')
        .controller('carListController', carListController);
    
    function carListController($routeParams,
                                   carService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            carService
                .findAllCarsForUser(model.userId)
                .then(renderCars);
        }
        init();

        function renderCars(cars) {
            model.cars = cars;
        }
    }
})();