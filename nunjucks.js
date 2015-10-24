var nunjucks = require('nunjucks');
var markdown = require('markdown-it')();

module.exports = function(app) {
   // view engine setup
   var env = nunjucks.configure('views', {
       autoescape: true,
       express: app
   });

   for(var k in filters)
      env.addFilter(k, filters[k]);

   return nunjucks;
}


var filters = {
   markdown: function(str) {
      return markdown.render(str);
   }
}
