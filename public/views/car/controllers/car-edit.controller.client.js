(function () {
    angular
        .module('CarShare')
        .controller('carEditController', carEditController);
    
    function carEditController(currentUser,
                               $routeParams,
                               $location,
                               carService) {
        var model = this;

        model.userId = currentUser._id;
        model.carId = $routeParams['carId'];
        model.deleteCar = deleteCar;
        model.updateCar = updateCar;

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

        function deleteCar() {
            carService
                .deleteCar(model.userId, model.carId)
                .then(function (status) {
                    $location.url('/car');
                });
        }

        function updateCar() {
            carService
                .updateCar(model.carId, model.car)
                .then(function (status) {
                    $location.url('/car');
                });
        }
    }
})();