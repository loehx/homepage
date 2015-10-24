module.exports = function(lodash) {

   // Use lodash as base library
   var std = lodash;

   // Extend lodash with custom functions ...


   /**
    * Iterates through an object deeply.
    * @param {Object} obj Object to iterate
    * @param {Function(obj, key, value)} iteratee Function that gets called for each key.
    */
   std.forEachValueRecursive = function(obj, iteratee) {
       for (var k in obj) {
           var value = obj[k]
           iteratee(obj, k, value)
           if (std.isPlainObject(value) || std.isArray(value)) {
               std.forEachValueRecursive(value, iteratee)
           }
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
           else if (std.isArray(value)) {
               std.forEachObjectRecursive(value, iteratee)
           }
       }
   }

   return std;
}

module.exports.shared = true;
