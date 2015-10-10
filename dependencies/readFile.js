module.exports = function(fs, errHandler) {
    return function(filePath, callback) {
        if (callback) {
            fs.readFile(filePath, 'utf-8', function(err, data) {
                if (err) {
                    errHandler("Failed to read file.", err)
                    callback(null);
                }
                else {
                    callback(data);
                }
            });
        }
        else {
            try {
                return fs.readFileSync(filePath, 'utf-8');
            }
            catch (err) {
                errHandler(err);
                return null;
            }
        }

    }
}