var passport = require('passport');

// Notes:
// *******************************************
//    - route '/*' or '*' accepts all routes

module.exports = function (app) {

  app.get('/partials/*', function (request, response) {
    response.render('../../public/app/' + request.params[0])
  });

  app.post('/login', function (request, response, next) {
    var auth = passport.authenticate('local', function (err, user) {
      if (err) return next(err);
      if (!user) {
        response.send({success: false})
      }


      request.logIn(user, function (err) {
        if (err) return next(err);

        response.send({success: true, user: user})
      });
    });

    auth(request, response, next);
  });

  app.get('*', function (request, response) {
    response.render('index');
  });

};