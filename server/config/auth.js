var passport = require('passport');

exports.authenticate = function (request, response, next) {
    var auth = passport.authenticate('local', function (err, user) {
        if (err) return next(err);
        if (!user) {
            response.send({success: false})
        }
    });
    request.logIn(user, function (err) {
        if (err) return next(err);

        response.send({success: true, user: user})
    });
    auth(request, response, next);
};