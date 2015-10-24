var assert = require('assert');

module.exports = ['absolutePath', 'fs-extra', 'error', 'log', function(absolutePath, fse, error, log) {

	return function(assetsFolder) {
		assert(assetsFolder);
      assert(fse);

      var targetFolder = absolutePath('public/assets');

		fse.emptyDir(targetFolder, function(err) {
			if (err) return console.error(err);
			log('Public assets folder cleared: ' + targetFolder);

			fse.copy(assetsFolder, targetFolder, function(err) {
				error(err);
				log('Copied assets to public asset folder.');
			});
		});

	};
}];
