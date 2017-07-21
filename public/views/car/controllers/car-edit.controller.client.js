(function () {
    angular
        .module('CarShare')
        .controller('carEditController', carEditController);
    
    function carEditController($routeParams,
                                   $location,
                                   carService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.carId = $routeParams['carId'];
        model.deleteCar = deleteCar;

        function init() {
            model.cars = carService
                .findAllCarsForUser(model.userId)
                .then(renderCars);
            model.car = carService
                .findCarById(model.carId)
                .then(renderCar);
        }
        init();

        function renderCars(cars) {
            model.cars = cars;
        }

        function renderCar(car) {
            model.car = car;
        }

        function deleteCar(carId) {
            carService
                .deleteCar(model.userId, carId)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/car');
                });
        }
    }
})();