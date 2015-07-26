var fs = require("fs")
var path = require("path")
var Q = require("q")
var std = require("../std")
var markdown = require("markdown").markdown

/**
 * Organizes the website content.
 */
var MainController = function() {

    // Set data folder and ensure it rly exists
    this.dataFolder = path.join(__dirname, '../data')
    if (!fs.existsSync(this.dataFolder))
        return console.log("'data' folder could not be found!", this.dataFolder)

    this.getModel = MainController.prototype.getModel.bind(this)
}


MainController.cache = {}

/**
 * Gets the specific data model using a virtual path
 * @param {String} filePath The path to the data source. (eg. /en/home)
 * @param {Function} callback Function to receive error or object.
 */
MainController.prototype.getModel = function(virtualPath, callback) {
    virtualPath = path.join(this.dataFolder, virtualPath.trim('/') + '.json')
    var a = MainController.parseFile(virtualPath)
        .then(function(content) {
            translateMarkdown(content)
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

    // See if it's already cached
    if (cache[filePath]) {
        deferred.resolve(cache[filePath])
        return deferred.promise
    }

    // Read the file contents as UTF8
    fs.readFile(filePath, 'utf-8', function(err, content) {
        if (err) return deferred.resolve()

        // Try to parse the contents
        try {
            var result = JSON.parse(content)
            return MainController.resolveReferences(result, path.dirname(filePath))
                .then(function() {
                    // Cache and return the parsed object
                    cache[filePath] = result
                    deferred.resolve(result)
                })
        }
        catch (err) {
            // Make sure markdown content is marked as markdown.
            if (path.extname(filePath) === '.md') 
                content = '(markdown)' + content;
                
            cache[filePath] = content
            deferred.resolve(content)
        }
    })

    return deferred.promise
}

/**
 * Iterates through all values in the passed obect (recursive).
 * If a value is a relative path (starting with '.'), try to find and parse it too.
 * All keys named 'inherit' of type Array will be merged into the model.
 * @param {Object} json Object to resolve.
 * @param {String} rootFolder Root folder.
 */
MainController.resolveReferences = function(json, rootFolder) {
    var promises = [],
        self = this

    forEachValueRecursive(json, function(obj, key, value) {
        if (key === 'inherit' && std.isArray(value)) {

            // Resolve inheritance to other .json files
            for (var i = 0; i < value.length; i++) {
                var filePath = path.join(rootFolder, value[i])
                var promise = self.parseFile(filePath)
                    .then(function(content) {
                        // Merge the inherited file with the current
                        if (typeof content === 'object')
                            std.assign(obj, content, function(value, other) {
                                return value || other
                            })
                    })
                promises.push(promise)
            }
        }
        else if (typeof value === 'string' && value[0] === '.') {

            // Resolve file reference
            var filePath = path.join(rootFolder, value)
            var promise = self.parseFile(filePath)
                .then(function(content) {
                    // Replace the reference by the file contents
                    if (content) obj[key] = content
                })
            promises.push(promise)
        }
    })

    return Q.all(promises)
}

/**
 * Iterates through all values in an object and converts 
 * all strings containing "markdown" to HTML.
 * */
function translateMarkdown(obj) {
    forEachValueRecursive(obj, function(obj, key, value) {
       if (std.isString(value) && value.indexOf('(markdown)') !== -1) {
           obj[key] = markdown.toHTML(value.replace('(markdown)', ''))
       }
    })
}

/**
 * Iterates through an object deeply.
 * @param {Object} obj Object to iterate
 * @param {Function(obj, key, value)} iteratee Function that gets called for each key.
 */
function forEachValueRecursive(obj, iteratee) {
    for (var k in obj) {
        var value = obj[k]
        iteratee(obj, k, value)
        if (std.isPlainObject(value))
            forEachValueRecursive(value, iteratee)
    }
}

module.exports = MainController


/* DEBUGGING */
/*
var controller = new MainController()
var start = new Date();

console.log('Try to get data from the Content Factory ...')

controller.getModel('/en/home', function(err, data) {
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