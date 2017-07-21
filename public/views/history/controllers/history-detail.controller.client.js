(function () {
    angular
        .module('CarShare')
        .controller('historyDetailController', historyDetailController);
    
    function historyDetailController($routeParams,
                                   $location,
                                   historyService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.historyId = $routeParams['historyId'];

        function init() {
            model.historys = historyService
                .findAllHistorysForUser(model.userId)
                .then(renderHistorys);
            model.history = historyService
                .findHistoryById(model.historyId)
                .then(renderHistory);
        }
        init();

        function renderHistorys(historys) {
            model.historys = historys;
        }

        function renderHistory(history) {
            model.history = history;
        }

        function deleteHistory(historyId) {
            historyService
                .deleteHistory(model.userId, historyId)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/history');
                });
        }
    }
})();