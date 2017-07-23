(function () {
    angular
        .module('CarShare')
        .controller('historyListController', historyListController);
    
    function historyListController($routeParams,
                                   historyService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            historyService
                .findHistoryByUserId(model.userId)
                .then(renderHistories);
        }
        init();

        function renderHistories(histories) {
            model.histories = histories;
        }
    }
})();