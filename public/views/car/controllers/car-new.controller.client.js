(function () {
    angular
        .module('CarShare')
        .controller('carNewController', carNewController);
    
    function carNewController($routeParams, carService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.carId = 'default';

        function init() {
            model.cars = carService
                .findAllCarsForUser(model.userId)
                .then(renderCars);
        }
        init();

        function renderCars(cars) {
            model.cars = cars;
        }
    }
})();