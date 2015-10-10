var fse = require("fs-extra");

module.exports = function(path, projectDir) {
    return function(virtualPath) {
        return path.join(projectDir, virtualPath);
    };
}
