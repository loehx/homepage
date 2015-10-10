var glob = require("glob");

module.exports = function(projectDir) {
    var options = {
      root: projectDir
    };

    return function(pattern, callback) {
        if (callback) {
            glob(pattern, options, callback);
        }
        else {
            return glob.sync(pattern, options);
        }
    }
}
