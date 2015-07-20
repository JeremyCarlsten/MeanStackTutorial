var passport = require('passport');

module.exports.authenticate = function (request, response, next) {
    //request.body.username = request.body.username.toLowerCase();
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return response.send({success: false});
        }
        request.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

            console.log("User");
            console.log(user);

            return response.send({success: true, user: user});
        });
    })(request, response, next);
};

module.exports.requiresApiLogin = function (request, response, next) {
    if (!request.isAuthenticated()) {
        response.status(403);
        response.end();
    } else {
        next();
    }
};

module.exports.requiresRole = function (role) {
    return function (request, response, next) {
        if (!request.isAuthenticated() || request.user.roles.indexOf(role) == -1) {
            response.status(403);
            response.end();
        } else {
            next();
        }
    }
};