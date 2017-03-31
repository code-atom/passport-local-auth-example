
var db = require('../models');

exports.create = function (data, done) {
    db.User.setPassword(data.password, function (err, hash, salt) {
        var user = db.User.build({
            email: data.email,
            passwordHash: hash,
            passwordSalt: salt,
            phone: data.phone,
            type: data.type
        });
        user.save().then(function(user){
            done(null , user);
        }).catch(done);
    });
};

exports.getById = function (id) {
    return db.User.find({
        where: {
            id: id
        }
    })
};
exports.getUserByEmail = function (email) {
    return db.User.find({
        where: {
            email: email
        }
    });
}
exports.comparePassword = function (password, passwordHash, done) {
    db.User.comparePassword(password, passwordHash, function (err, status) {
        if (err) {
            return done(err);
        }
        return done(null, status);
    });
};  