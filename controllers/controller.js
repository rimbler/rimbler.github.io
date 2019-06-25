// Home Page
module.exports.home = function(req, res) {
    res.render('home');
};

// About Me Page
module.exports.index = function(req, res) {
    res.render('index');
};

// Resume Page
module.exports.resume = function(req, res) {
    res.render('resume');
};

// Projects Page
module.exports.projects = function(req, res) {
    res.render('projects');
};
