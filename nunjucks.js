var nunjucks = require('nunjucks');
var markdown = require('markdown-it')();

module.exports = function(app) {
	// view engine setup
	var env = nunjucks.configure('views', {
		autoescape: true,
		express: app
	});

	for (var k in filters)
		env.addFilter(k, filters[k]);

	return nunjucks;
}


var filters = {
	markdown: function(str) {
		return ~str.indexOf('\n') ? markdown.render(str) : markdown.renderInline(str);
	},
	params: function(url, params) {
		var qs;

		// get or build up query string
		if (typeof params === 'string') {
			qs = params;
		} else {
			var list = [];
			for (var k in params)
				list.push(k + '=' + params[k]);
			qs = list.join('&');
		}

		if (!qs) {
			return url; // no query string
		} else {
			// attach query string to url
			url += ~url.indexOf('?') ? '&' : '?';
			url += qs;
			return url;
		}
	},
   image: function(url) {
      return '<img src="' + url + '">'; 
   }
}
