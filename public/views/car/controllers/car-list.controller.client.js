(function () {
    angular
        .module('CarShare')
        .controller('carListController', carListController);
    
    function carListController(currentUser,
                               carService) {
        var model = this;

        model.userId = currentUser._id;

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