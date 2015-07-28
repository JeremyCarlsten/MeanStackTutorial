var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true},
    salt: {type: String, required: '{PATH} is required!'},
    hashed_password: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encryption.hashPassword(this.salt, passwordToMatch) === this.hashed_password;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > 0;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){

User.find({}).exec(function (err, collection) {
    if (collection.length == 0) {
        var salt, hash;
        salt = encryption.createSalt();
        hash = encryption.hashPassword(salt, 'JeremyCarlsten');
        User.create({
            firstName: "Jeremy",
            lastName: "Carlsten",
            username: "JeremyCarlsten@JeremyCarlsten.com",
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
            username: "TheWoodWhisperer@gmail.com",
            salt: salt,
            hashed_password: hash
        });

        salt = encryption.createSalt();
        hash = encryption.hashPassword(salt, 'MBW');
        User.create({
            firstName: "Matt",
            lastName: "Vanderlist",
            username: "MBW@email.com",
            salt: salt,
            hashed_password: hash,
            roles: []
        });
    }
});
}

exports.createDefaultUsers = createDefaultUsers;

