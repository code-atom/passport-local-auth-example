var home = require('../controllers/homeController')
module.exports = function (app, passport) {
    app.get('/', isNotLoggedIn, home.index);
    app.get('/dashboard', isLoggedIn, home.dashboard);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    
    app.get("*", function(req, res){
        res.redirect('/');
    })
}


function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/dashboard');
}