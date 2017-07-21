(function() {
    angular
        .module('WebAppMaker')
        .service('flickrService', flickrService);

    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "036966b71b9c2420d6c6ef8e4b410d72";
        var secret = "df51596652d202ad";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }
})();
