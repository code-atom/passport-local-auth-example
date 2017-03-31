
var userDAO = require('../dao/userDao');



exports = module.exports = function (app, passport) {
    passport.serializeUser(function (userid, done) {
        done(null, userid);
    });

    passport.deserializeUser(function (result, done) {
        userDAO.getById(result.id)
            .then(function (user) {
                done(null, user);
            }).catch(done);
    })

    require('./local-auth')(app, passport);
};