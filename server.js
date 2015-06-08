var express = require('express'),
        stylus = require('stylus'),
        logger = require('morgan'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

var PORT = process.env.PORT || 3030;


app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));

app.use(express.static(__dirname + '/public'));
console.log("Environment: " + env)
if (env == 'development') {
    mongoose.connect('mongodb://localhost/meanTutorial');
}
else {
    mongoose.connect('mongodb://jcarlsten:password@ds043012.mongolab.com:43012/meantutorial');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection'));
db.once('open', function () {
    console.log("database is opened");
});

// Notes:
// *******************************************
//    - route '/*' or '*' accepts all routes

app.get('/partials/*', function (request, response) {
    response.render('../../public/app/' + request.params[0])
});

app.get('*', function (request, response) {
    response.render('index');
});

app.listen(PORT);
console.log("Listening on port " + PORT + " ...");