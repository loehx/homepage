
var dependency = module.exports = function(absolutePath, parseJsonFile, fs, log, error, resolveSettings, path, assert, resolveFileReferences, serveAssets) {

   return function(virtualPath, callback) {
      var dataPath = absolutePath('/data');
      var filePath = dataPath + '/' + virtualPath.trim('/') + '.json';
      var rootPath = path.dirname(filePath);
      if (!fs.existsSync(filePath))
         return error("Missing file to resolve " + virtualPath + ": " + filePath) & callback(undefined);

      var model = parseJsonFile(filePath);

      resolveSettings(rootPath, dataPath, function(settings) {

         // Merge settings into model
         for(var k in settings) {
            if (model[k] === undefined)
               model[k] = settings[k];
         }

         resolveFileReferences(model, rootPath, function(model) {
            callback(model);
         })
      });

      serveAssets(dataPath + '/assets');
   }

}

dependency.shared = true;
