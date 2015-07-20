var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {

    app.get('/partials/*', function (request, response) {
        response.render('../../public/app/' + request.params[0])
    });

    app.get('/api/users', auth.requiresRole('admin'),
        function (request, response) {
        User.find({}).exec(function (err, collection) {
            response.send(collection);
        });
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