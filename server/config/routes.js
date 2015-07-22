var auth = require('./auth'),
    users = require('../controllers/users'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {

    app.get('/partials/*', function (request, response) {
        response.render('../../public/app/' + request.params[0])
    });

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);

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