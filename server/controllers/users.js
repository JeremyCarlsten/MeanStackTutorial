var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getUsers = function (request, response) {
    User.find({}).exec(function (err, collection) {
        response.send(collection);
    })
};

exports.createUser = function (request, response) {
    var userData = request.body;
    userData.salt = encryption.createSalt();
    userData.hashed_password = encryption.hashPassword(userData.salt, userData.password);

    User.create(userData, function (err, user) {
        if (err) {
            console.log(err);
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }

            response.status(400);
            return response.send({reason: err.toString()})
        }
        request.login(user, function (err) {
            console.log("Logging In");
            console.log(err);
            console.log(user);
            if (err) {
                return next(err);
            }

            response.send(user);
        })
    })
};