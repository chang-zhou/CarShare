(function () {
    angular
        .module('CarShare')
        .controller('historyDetailController', historyDetailController);
    
    function historyDetailController($routeParams,
                                   historyService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.historyId = $routeParams['historyId'];

        function init() {
            model.histories = historyService
                .findAllHistoriesForUser(model.userId)
                .then(renderHistories);
            model.history = historyService
                .findHistoryById(model.historyId)
                .then(renderHistory);
        }
        init();

        function renderHistories(histories) {
            model.histories = histories;
        }

        function renderHistory(history) {
            model.history = history;
        }
    }
})();