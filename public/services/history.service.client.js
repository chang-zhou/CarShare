(function() {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService($http) {
        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        function createPage(websiteId, page) {
            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findPageByWebsiteId(websiteId) {
            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findPageById(pageId) {
            var url = "/api/assignment/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(websiteId, pageId){
            var url = "/api/assignment/website/"+websiteId+"/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = "/api/assignment/page/"+pageId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();