(function () {
    angular
        .module('CarShare')
        .controller('carNewController', carNewController);
    
    function carNewController($routeParams,
                                   $location,
                                   carService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createCar = createCar;

        function init() {
            model.cars = carService
                .findAllCarsForUser(model.userId)
                .then(renderCars);
        }
        init();

        function renderCars(cars) {
            model.cars = cars;
        }

        function renderCar(car) {
            model.car = car;
        }

        function createCar(car) {
            carService
                .createCar(model.userId, car)
                .then(renderCar)
                .then(function () {
                    $location.url('/user/'+model.userId+'/car');
                });
        }
    }
})();