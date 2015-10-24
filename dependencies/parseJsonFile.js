module.exports = function(readFile, error) {
    return function(filePath, callback) {

        if (callback) {
            readFile(filePath, function(data) {
                if (!data) return callback(null);
                var obj;

                try {
                    obj = JSON.parse(data);
                }
                catch (err) {
                    error("Failed to parse json file: " + filePath, err);
                }
                callback(obj);
            })
        }
        else {
            var json = readFile(filePath);
            if (!json) return null;

            try {
                return JSON.parse(json);
            }
            catch (err) {
                error("Failed to parse json file", err);
                return null;
            }
        }

    }
}
