var fse = require("fs-extra");

module.exports = function() {
    return fse.ensureDirSync;
}