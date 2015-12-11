const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
const apipost = require('./api/posts');

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'MyData', key: 'mydata', href: '/mydata' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});


// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
};

var Post = keystone.list('Post');

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/mydata', routes.views.mydata);
	app.all('/contact', routes.views.contact);

	//apis
	//app.all('/api*',  keystone.middleware.api);
	//app.all('/api*', keystone.middleware.cors);

	app.get('/api/posts',keystone.middleware.api, apipost.list);
///	app.all('/api/post/create', keystone.initAPI, routes.api.posts.create);
//	app.get('/api/post/:id', keystone.initAPI, routes.api.posts.get);
//	app.all('/api/post/:id/update', keystone.initAPI, routes.api.posts.update);
//	app.get('/api/post/:id/remove', keystone.initAPI, routes.api.posts.remove);

	// Downloads
	app.get('/download/users', routes.download.users);

}
