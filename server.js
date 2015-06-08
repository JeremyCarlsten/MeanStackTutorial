var express = require('express'),
        stylus = require('stylus'),
        logger = require('morgan'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app = express();

var config = require('./server/config/config')[env];

function compile(str, path) {
    return stylus(str).set('filename', path);
}

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

require('./server/config/mongoose')(config);
require('./server/config/routes')(app);


app.listen(config.port);
console.log("Listening on port " + config.port + " ...");