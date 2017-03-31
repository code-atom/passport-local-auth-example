var express = require('express');
var passport = require('passport');
var db = require('./models');

var app = express();
app.set('rootPath', __dirname);
require('./appStart')(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.sequelize.sync();

app.listen(3000, function () {
    console.log('%s: Node server started on %s:%d ...',
      Date(Date.now()));
  });

module.exports = app;