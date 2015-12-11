var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);

    view.render('mydata', {
        section: 'mydata',
    });

}