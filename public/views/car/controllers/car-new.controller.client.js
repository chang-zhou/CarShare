(function () {
    angular
        .module('CarShare')
        .controller('carNewController', carNewController);
    
    function carNewController(currentUser, carService) {
        var model = this;

        model.userId = currentUser._id;
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