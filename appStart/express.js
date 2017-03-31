var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function (app, passport) {
    // setting a view folder in application
    app.set('views', path.join(app.get('rootPath'), 'views'));
    // set a application view engine
    app.set('view engine', 'ejs');
    // set logger in application request
    app.use(logger('dev'));
    //parse request body in json
    app.use(bodyParser.json());
    // parse request body in urlencoded format
    app.use(bodyParser.urlencoded({ extended: false }));
    // set cookie parser
    app.use(cookieParser());
    // set static folder in application
    app.use(express.static(path.join(app.get('rootPath'), 'public')));


    app.use(passport.initialize());
    app.use(passport.session());
    require('../auth-middlewares')(app, passport);
};