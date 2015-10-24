module.exports = function(parseJsonFile, path, async, assert, lodash, fs) {

	function getSettings(dir, topDir, callback) {
      var paths = [];
      paths.push(path.join(dir, 'settings.json'));

		do {
         dir = path.join(dir, '..');
			paths.push(path.join(dir, 'settings.json'));
		}
		while (dir != topDir);

		async.map(paths, function(path, callback) {
			fs.exists(path, function(exists) {
				if (!exists) callback(null, null);
				parseJsonFile(path, function(json) {
					callback(null, json);
				})
			})
		}, function(err, jsons) {
			var settings = {};

			jsons.reverse().forEach(function(json) {
				if (json) lodash.extend(settings, json);
			})

			callback(settings);
		});
	}

	return getSettings;
}
