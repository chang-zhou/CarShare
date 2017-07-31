(function () {
    angular
        .module('CarShare')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/post', {
                templateUrl: 'views/post/templates/post-list.view.client.html',
                controller: 'postListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/post/new', {
                templateUrl: 'views/car/templates/car-list.view.client.html',
                controller: 'carListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/post/:postId', {
                templateUrl: 'views/post/templates/post-edit.view.client.html',
                controller: 'postEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/car', {
                templateUrl: 'views/car/templates/car-list.view.client.html',
                controller: 'carListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/car/new', {
                templateUrl: 'views/car/templates/car-new.view.client.html',
                controller: 'carNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/car/:carId', {
                templateUrl: 'views/car/templates/car-edit.view.client.html',
                controller: 'carEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/car/:carId/post', {
                templateUrl: 'views/post/templates/post-new.view.client.html',
                controller: 'postNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/history', {
                templateUrl: 'views/history/templates/history-list.view.client.html',
                controller: 'historyListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/history/:historyId', {
                templateUrl: 'views/history/templates/history-detail.view.client.html',
                controller: 'historyDetailController',
                controllerAs: 'model'
            })
    }
})();