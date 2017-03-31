"use strict";

var expressConfiguration = require('./express'); 
var routeConfiguration = require('./routes');
module.exports = exports = function(app, passport) {
    expressConfiguration(app, passport);
    routeConfiguration(app, passport);
};