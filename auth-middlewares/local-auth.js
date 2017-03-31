var LocalStrategy = require('passport-local').Strategy;
var userDAO = require('../dao/userDao');

module.exports = function (app, passport) {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            userDAO.getUserByEmail(email)
                .then(function (user) {
                    if (!user) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }

                    userDAO.comparePassword(password, user.passwordHash, function (err, status) {
                        if (err) {
                            return done(err);
                        }
                        if (!status) {
                            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                        }
                         done(null, user);
                    });
                }).catch(done);
        });
    }));
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            process.nextTick(function () {
                userDAO.getUserByEmail(email).then(function(user) {
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser ={};
                        // set the user's local credentials
                        newUser.email = email;
                        newUser.password = password;
                        newUser.phone = req.body.phone;
                        newUser.type = req.body.type;
                        // save the user
                        userDAO.create(newUser, function (err, newUser) {
                            if(err)
                                return done(err);
                             done(null, newUser);
                        })
                    }

                })
            });
        }));

}