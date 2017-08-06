(function () {
    angular
        .module('CarShare')
        .config(configuration);

    function configuration($routeProvider, $sceDelegateProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/guest-search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'guestSearchController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
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
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/post', {
                templateUrl: 'views/post/templates/post-list.view.client.html',
                controller: 'postListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/post/new', {
                templateUrl: 'views/car/templates/car-list.view.client.html',
                controller: 'carListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/post/:postId', {
                templateUrl: 'views/post/templates/post-edit.view.client.html',
                controller: 'postEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/car', {
                templateUrl: 'views/car/templates/car-list.view.client.html',
                controller: 'carListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/car/new', {
                templateUrl: 'views/car/templates/car-new.view.client.html',
                controller: 'carNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/car/:carId', {
                templateUrl: 'views/car/templates/car-edit.view.client.html',
                controller: 'carEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/car/:carId/post', {
                templateUrl: 'views/post/templates/post-new.view.client.html',
                controller: 'postNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/history', {
                templateUrl: 'views/history/templates/history-list.view.client.html',
                controller: 'historyListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });

        $sceDelegateProvider.resourceUrlWhitelist([
            //Allow same origin resource loads.
            'self',

            //Allow loading from Bing Maps Rest Services.
            'https://dev.virtualearth.net/REST/**'
        ]);

    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

})();