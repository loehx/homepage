module.exports = function(readFile, errHandler) {
    return function(filePath, callback) {

        if (callback) {
            readFile(filePath, function(data) {
                if (!data) return callback(null);

                try {
                    var obj = JSON.parse(data);
                    callback(obj);
                }
                catch (err) {
                    errHandler("Failed to parse json file", err);
                    callback(null);
                }
            })
        }
        else {
            var json = readFile(filePath);
            if (!json) return null;

            try {
                return JSON.parse(json);
            }
            catch (err) {
                errHandler("Failed to parse json file", err);
                return null;
            }
        }

    }
}