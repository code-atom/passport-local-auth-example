
var db = require('../models');

exports.create = function (email, password) {
    db.User.setPassword(data.password, function (err, hash, salt) {
        var user = db.User.build({
            userName: data.userName,
            name: data.name,
            passwordHash: hash,
            passwordSalt: salt,
        });
        return user.save();
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
    userDAO.comparePassword(password, user.passwordHash, function (err, status) {
        if (err) {
            return done(err);
        }
        return done(null, user);
    });
};  