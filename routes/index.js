var express = require('express')
var router = express.Router()
var beautifier = require('js-beautify')
var dependencies = require('../dependencies');


router.get('*', function(req, res, next) {
	var path = req.path === '/' ? '/en/home' : req.path // Fallback

	dependencies.resolve(function(getModel) {
		getModel(path, function(model) {
			res.render(model.view, model, function(err, html) {
				if (err) return next(err) || console.error(err);

				html = html.replace(/\s*\n/gm, ''); // remove empty lines.
				html = beautifier.html(html) // Beautify html output.
				res.send(html)
			})
		});
	});
});

module.exports = router
