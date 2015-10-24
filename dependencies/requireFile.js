module.exports = function(fs, error) {
    return function(filePath) {
        if (!fs.existsSync(filePath)) {
            error("Required file does not exist!", filePath);
            return false;
        }
        else {
            return true;
        }
    }
}
