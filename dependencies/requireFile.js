module.exports = function(fs, errHandler) {
    return function(filePath) {
        if (!fs.existsSync(filePath)) {
            errHandler("Required file does not exist!", filePath);
            return false;
        }
        else {
            return true;
        }
    }
}