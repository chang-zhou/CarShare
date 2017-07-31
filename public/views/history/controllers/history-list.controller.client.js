(function () {
    angular
        .module('CarShare')
        .controller('historyListController', historyListController);
    
    function historyListController($routeParams,
                                   historyService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.renderHistory = renderHistory;

        function init() {
            historyService
                .findHistoriesByUserId(model.userId)
                .then(renderHistories);
        }
        init();

        function renderHistories(histories) {
            model.histories = histories;
        }

        function renderHistory(history) {
            model.history = history;
            model.car = history._car;
        }
    }
})();