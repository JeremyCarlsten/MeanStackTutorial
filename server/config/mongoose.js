var mongoose = require('mongoose');
crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection'));
    db.once('open', function () { console.log("database is opened"); });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_password: String
    });

    userSchema.methods = {
      authenticate: function(passwordToMatch){
          return hashPassword(this.salt, passwordToMatch) === this.hashed_password;
      }
    };

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPassword(salt, 'JeremyCarlsten');
            User.create({firstName: "Jeremy", lastName: "Carlsten", userName: "JeremyCarlsten", salt: salt, hashed_password: hash});
            salt = createSalt();
            hash = hashPassword(salt, '007Bond');
            User.create({firstName: "James", lastName: "Bond", userName: "007Bond", salt: salt, hashed_password: hash});
            salt = createSalt();
            hash = hashPassword(salt, 'TheWoodWhisperer');
            User.create({firstName: "Marc ", lastName: "Spagnuolo", userName: "TheWoodWhisperer", salt: salt, hashed_password: hash});
            salt = createSalt();
            hash = hashPassword(salt, 'MBW');
            User.create({firstName: "Matt", lastName: "Vanderlist", userName: "MBW", salt: salt, hashed_password: hash});
        }
    });


    function createSalt() {
        return crypto.randomBytes(128).toString('base64')
    }

    function hashPassword(salt, password) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    }
};