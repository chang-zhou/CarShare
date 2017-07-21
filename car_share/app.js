var connectionString = 'mongodb://localhost/car_share'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds133311.mlab.com:33311/heroku_gtlkp1z4'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
// require('./services/post.service.server');
// require('./services/car.service.server');
// require('./services/history.service.server');