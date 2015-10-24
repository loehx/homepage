module.exports = function(fs, error) {
    return function(filePath, callback) {
        if (callback) {
            fs.readFile(filePath, 'utf-8', function(err, data) {
                if (err) {
                    error("Failed to read file.", err)
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
                error(err);
                return null;
            }
        }
    }
}
