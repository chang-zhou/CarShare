(function () {
    angular
        .module('CarShare')
        .controller('adminUserController', adminUserController);

    function adminUserController(userService) {

        var model = this;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.renderUser = renderUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        }
        init();

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(renderUsers);
        }

        function renderUsers(users){
            model.users = users;
        }

        function renderUser(user) {
            model.user = user;
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function (status) {
                    findAllUsers();
                });
        }

        function updateUser() {
            userService
                .updateUser(model.user._id, model.user)
                .then(function (status) {
                    findAllUsers();
                    model.message = 'Successfully updated user profile';
                });
        }

        function createUser(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .register(newUser)
                            .then(function (user) {
                                findAllUsers();
                            });
                    }
                );
        }
    }
})();