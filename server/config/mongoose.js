var mongoose = require('mongoose');

module.exports = function (config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection'));
  db.once('open', function () {
    console.log("database is opened");
  });
};