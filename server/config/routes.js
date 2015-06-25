var auth = require('./auth');

// Notes:
// *******************************************
//    - route '/*' or '*' accepts all routes

module.exports = function (app) {

    app.get('/partials/*', function (request, response) {
        response.render('../../public/app/' + request.params[0])
    });


    app.post('/login', auth.authenticate);
    app.post('/logout', function (request, response) {
        request.logout();
        response.end();
    });



    app.get('*', function (request, response) {
        response.render('index', {
            bootstrappedUser: request.user
        });
    });

};