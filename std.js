var _ = require("lodash");
var std = _


/**
 * Iterates through an object deeply.
 * @param {Object} obj Object to iterate
 * @param {Function(obj, key, value)} iteratee Function that gets called for each key.
 */
std.forEachValueRecursive = function(obj, iteratee) {
    for (var k in obj) {
        var value = obj[k]
        iteratee(obj, k, value)
        if (std.isPlainObject(value))
            std.forEachValueRecursive(value, iteratee)
    }
}


/**
 * Iterates through an object deeply.
 * @param {Object} obj Object to iterate
 * @param {Function(obj)} iteratee Function that gets called for each key.
 */
std.forEachObjectRecursive = function(obj, iteratee) {
    for (var k in obj) {
        var value = obj[k]
        if (std.isPlainObject(value)) {
            iteratee(value)
            std.forEachObjectRecursive(value, iteratee)
        }
    }
}

module.exports = std