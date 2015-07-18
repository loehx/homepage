var fs = require("fs")
var path = require("path")
var Q = require("q")


/**
 * Organizes the website content.
 */
var ContentFactory = function() {

    // Set data folder and ensure it rly exists
    this.dataFolder = path.join(__dirname, '../data')
    if (!fs.existsSync(this.dataFolder))
        return console.log("'data' folder could not be found!", this.dataFolder)

    this.get = ContentFactory.get.bind(this)
}

/**
 * Gets the specific data using a virtual path
 * @param {String} filePath The path to the data source. (eg. /en/home)
 * @param {Function} callback Function to receive error or object.
 */
ContentFactory.get = function(filePath, callback) {
    filePath = path.join(this.dataFolder, filePath)
    ContentFactory.parseFile(filePath, callback)
}

ContentFactory.cache = {}

/**
 * Reads a file, tries to parse it as JSON and returns an 
 * object or a string if the file couldn't be parsed.
 * Results will be cached automatically.
 * @param {String} filePath Absolute path to the file.
 * @param {Function} callback Function to receive error, object or string
 */
ContentFactory.parseFile = function(filePath, callback) {
    var cache = ContentFactory.cache
    if (cache[filePath])
        return cache[filePath]
    
    fs.readFile(filePath, 'utf-8', function(err, content) {
        var result
        if (err) return callback(err)

        try {
            result = JSON.parse(content)
            ContentFactory.resolveReferences(result, path.dirname(filePath), function() {
                cache[filePath] = result
                callback(null, result)
            })
        }
        catch (err) {
            cache[filePath] = content
            callback(null, content)
        }
    })
}

/**
 * Iterates through all values in the passed obect (recursive).
 * If a value is a relative path, we try to find and parse it too.
 * @param {Object} json Object to resolve.
 * @param {String} rootFolder Root folder
 * @param {Function} callback Function without arguments.
 */
ContentFactory.resolveReferences = function(json, rootFolder, callback) {
    var promises = [],
        self = this

    forEachValueRecursive(json, function(obj, key, value) {
        if (typeof value !== 'string' || value.length > 100)
            return
        
        var filePath = path.join(rootFolder, value)
        var promise = Q.nfcall(self.parseFile, filePath)
            .then(function(content) {
                obj[key] = content
            }, function(err) {})
        promises.push(promise)    
    })

    Q.all(promises).done(callback)
}


function forEachValueRecursive(obj, iteratee) {
    for (var k in obj) {
        var value = obj[k]
        iteratee(obj, k, value)
        if (typeof value === 'object')
            forEachValueRecursive(value, iteratee)
    }
}

module.exports = ContentFactory


/* DEBUGGING */

var factory = new ContentFactory()
var start = new Date();

console.log('Try to get data from the Content Factory ...')

factory.get('/en/home.json', function(err, data) {
    var duration = new Date() - start;
    console.log('BENCHMARK: ' + duration + ' ms');
    if (err) {
        console.log('FAILED: Factory failed to get data.', err)
    }
    else {
        console.log('SUCCESS: Factory respond successfully!', data)
    }
});