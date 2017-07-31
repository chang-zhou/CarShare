(function() {
    angular
        .module('CarShare')
        .service('historyService', historyService);

    function historyService($http) {
        this.createHistory = createHistory;
        this.findHistoriesByUserId = findHistoriesByUserId;
        this.findHistoriesByCarId = findHistoriesByCarId;
        this.findHistoryById = findHistoryById;

        function createHistory(userId, carId, renterId, post) {
            var url = "/api/user/"+userId+"/car/"+carId+"/renter/"+renterId+"/post/"+post._id+"/history";
            var history = {
                startDate: post.startDate,
                endDate: post.endDate,
                price: post.price,
                address: post.address
            };
            return $http.post(url, history)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findHistoriesByUserId(userId) {
            var url = "/api/user/"+userId+"/history";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findHistoriesByCarId(carId) {
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