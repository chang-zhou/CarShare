(function () {
    angular
        .module('CarShare')
        .service('carService', carService);

    function carService($http) {
        this.createCar = createCar;
        this.findAllCarsForUser = findAllCarsForUser;
        this.findCarById = findCarById;
        this.deleteCar = deleteCar;
        this.updateCar = updateCar;

        function createCar(userId, car) {
            var url = "/api/user/"+userId+"/car";
            return $http.post(url, car)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCarById(carId) {
            var url = "/api/car/"+carId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCarsForUser(userId) {
            var url = "/api/user/"+userId+"/car";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteCar(userId, carId) {
            var url = "/api/user/"+userId+"/car/"+carId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateCar(carId, car){
            var url = "/api/car/"+carId;
            return $http.put(url, car)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();