
exports.index = function (req, res, next) {
    return res.render("index");
}

exports.dashboard = function(req, res, next){
    return res.render('dashboard');
}