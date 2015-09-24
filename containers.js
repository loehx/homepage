var container = require('markdown-it-container');
var std = require('./std');

module.exports = function(markdown) {

    if (!markdown)
        throw "'markdown' parameter missing! Should be the 'markdown-it' instance!";
    
    // Feature #2: Dynamic navigation build up
    markdown.use(container, 'page', {
        render: function(tokens, idx) {
            try {
                if (!tokens[idx].info) return '</section>';
                var name = tokens[idx].info.match(/\".+\"/).toString();
                name = std.trim(name, '" ');
                return '<section class="page" id="page-' + std.kebabCase(name) + '"><a name="page-' + std.kebabCase(name) + '" title="' + name + '"></a>';
            }
            catch (e) {
                return e.message;
            }
        }
    })
}