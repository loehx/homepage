var fs = require("fs")
var path = require("path")
var Q = require("q")
var std = require("../std")


/**
 * Organizes the website content.
 */
var MainController = function() {

    // Set data folder and ensure it rly exists
    this.dataFolder = path.join(__dirname, '../data')
    if (!fs.existsSync(this.dataFolder))
        return console.log("'data' folder could not be found!", this.dataFolder)

    this.get = MainController.get.bind(this)
}


MainController.cache = {}

/**
 * Gets the specific data using a virtual path
 * @param {String} filePath The path to the data source. (eg. /en/home)
 * @param {Function} callback Function to receive error or object.
 */
MainController.get = function(filePath, callback) {
    filePath = path.join(this.dataFolder, filePath.trim('/') + '.json')
    var a = MainController.parseFile(filePath)
        .then(function(content) {
            callback(null, content)
        })
}


/**
 * Reads a file, tries to parse it as JSON and returns an 
 * object or a string if the file couldn't be parsed.
 * Results will be cached automatically.
 * @param {String} filePath Absolute path to the file.
 */
MainController.parseFile = function(filePath) {
    var cache = MainController.cache
    var deferred = Q.defer()
    if (cache[filePath])
        return deferred.resolve(cache[filePath])

    fs.readFile(filePath, 'utf-8', function(err, content) {
        if (err) return deferred.resolve()
    
        try {
            var result = JSON.parse(content)
            return MainController.resolveReferences(result, path.dirname(filePath))
                .then(function() {
                    cache[filePath] = result
                    deferred.resolve(result)
                })
        }
        catch (err) {
            cache[filePath] = content
            deferred.resolve(content)
        }
    })

    return deferred.promise
}

/**
 * Iterates through all values in the passed obect (recursive).
 * If a value is a relative path, we try to find and parse it too.
 * @param {Object} json Object to resolve.
 * @param {String} rootFolder Root folder.
 */
MainController.resolveReferences = function(json, rootFolder) {
    var promises = [],
        self = this

    forEachValueRecursive(json, function(obj, key, value) {
        if (typeof value !== 'string' || value[0] !== '.')
            return

        var filePath = path.join(rootFolder, value)
        var promise = self.parseFile(filePath)
            .then(function(content) {
                if (content) obj[key] = content
            })
        promises.push(promise)
    })

    return Q.all(promises)
}


function forEachValueRecursive(obj, iteratee) {
    for (var k in obj) {
        var value = obj[k]
        iteratee(obj, k, value)
        if (typeof value === 'object')
            forEachValueRecursive(value, iteratee)
    }
}

module.exports = MainController


/* DEBUGGING */
/*
var controller = new MainController()
var start = new Date();

console.log('Try to get data from the Content Factory ...')

controller.get('/en/home', function(err, data) {
    var duration = new Date() - start;
    console.log('BENCHMARK: ' + duration + ' ms');
    if (err) {
        console.log('FAILED: Factory failed to get data.', err)
    }
    else {
        console.log('SUCCESS: Factory respond successfully!', data)
    }
})

*/