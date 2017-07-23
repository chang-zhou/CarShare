(function() {
    angular
        .module('CarShare')
        .service('historyService', historyService);

    function historyService($http) {
        this.createHistory = createHistory;
        this.findHistoryByUserId = findHistoryByUserId;
        this.findHistoryByCarId = findHistoryByCarId;
        this.findHistoryById = findHistoryById;

        function createHistory(userId, carId, history) {
            var url = "/api/user/"+userId+"/car/"+carId+"/history";
            return $http.post(url, history)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findHistoryByUserId(userId) {
            var url = "/api/user/"+userId+"/history";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findHistoryByCarId(carId) {
            var url = "/api/car/"+carId+"/history";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findHistoryById(historyId) {
            var url = "/api/history/"+historyId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();