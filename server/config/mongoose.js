var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');
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
        username: String,
        salt: String,
        hashed_password: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return encryption.hashPassword(this.salt, passwordToMatch) === this.hashed_password;
        }
    };

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'JeremyCarlsten');
            User.create({
                firstName: "Jeremy",
                lastName: "Carlsten",
                username: "JeremyCarlsten",
                salt: salt,
                hashed_password: hash,
                roles: ['admin']
            });
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, '007Bond');
            User.create({firstName: "James", lastName: "Bond", username: "007Bond", salt: salt, hashed_password: hash});
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'TheWoodWhisperer');
            User.create({
                firstName: "Marc ",
                lastName: "Spagnuolo",
                username: "TheWoodWhisperer",
                salt: salt,
                hashed_password: hash
            });
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'MBW');
            User.create({
                firstName: "Matt",
                lastName: "Vanderlist",
                username: "MBW",
                salt: salt,
                hashed_password: hash,
                roles: []
            });
        }
    });
};