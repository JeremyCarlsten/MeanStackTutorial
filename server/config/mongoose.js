var mongoose = require('mongoose');

module.exports = function (config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection'));
  db.once('open', function () {
    console.log("database is opened");
  });


    var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection){
    if(collection.length == 0) {
      User.create({firstName: "Jeremy", lastName: "Carlsten", userName: "JeremyCarlsten"});
      User.create({firstName: "James", lastName: "Bond", userName: "007Bond"});
      User.create({firstName: "Marc ", lastName: "Spagnuolo", userName: "TheWoodWhisperer"});
      User.create({firstName: "Matt", lastName: "Vanderlist", userName: "MBW"});
    }
  });

};