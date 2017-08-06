var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get ('/api/user/:userId', findUserById);
app.get ('/api/user', findUserByCredentials);
app.get ('/api/admin/user', isAdmin, findAllUsers);
app.get ('/api/username', findUserByUsername);
app.post('/api/user', createUser);
app.put ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', unregisterUser);
app.delete ('/api/admin/user/:userId', isAdmin, deleteUser);

app.post  ('/api/login', passport.authenticate('local'), login);
app.get   ('/api/loggedin', loggedin);
app.get   ('/api/checkAdmin', checkAdmin);
app.post  ('/api/logout', logout);
app.post  ('/api/register', register);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/index.html#!/profile',
        failureRedirect: '/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function login(req, res) {
    res.json(req.user);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    var user = req.user;
    if(req.isAuthenticated() && user.role.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);

    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status);
            });
        });
}

function unregisterUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            req.logout();
            res.sendStatus(200);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                // if the user exists, compare passwords with bcrypt.compareSync
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.role.indexOf('ADMIN') > -1){
        next();
    }
    else{
        res.sendStatus(401);
    }
}

function findAllUsers(req, res) {
    userModel
        .find()
        .then(function (users) {
            res.json(users);
        })
}