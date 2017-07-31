(function () {
    angular
        .module('CarShare')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }

            else if(password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password is required';
                return;
            }

            userService
                .login(username, password)
                .then(function (found) {
                        if(found !== null) {
                            $location.url('/profile');
                        } else {
                            model.message = "Sorry, " + username + " not found. please try again!";
                        }
                    },
                    function (error) {
                        model.message = "Sorry, " + username + " not found. please try again!";
                    });
        }
    }
})();