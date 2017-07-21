(function () {
    angular
        .module('WebAppMaker')
        .directive('wdDraggable', wdDraggable);
    
    function wdDraggable($routeParams,
                         $http) {
        function linkFunction(scope, element) {
            var index1, index2;
            var pageId = $routeParams['pageId'];
            $(element).sortable({
                start: function(event, ui) {
                    index1 = ui.item.index();
                },
                update: function(event, ui) {
                    index2 = ui.item.index();
                    $http.put("/page/"+pageId+"/widget?start="+index1+"&end="+index2);
                }
            });
        }
        return {
            link: linkFunction
        }
    }
})();