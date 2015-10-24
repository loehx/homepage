var dependency = module.exports = function(async, parseJsonFile, readFile, path, fs, log, error, std) {
	/**
	 * Resolves file references in objects.
	 * E.g. { title: 'test', content: 'include:home/about.md' }
	 * turns into:  { title: 'test', content: '# About me\n...' }
	 */
	function resolveFileReferences(source, baseDirectory, callback) {

		// Get all references flat
		var references = collectReferences(source)

		// Turn virtual into absolute paths
		references = references.map(function(reference) {
			reference.path = path.join(baseDirectory, reference.path);
			return reference;
		});

		// Resolve all references async
		async.map(references, resolveReference, function done(err, references) {

			// Recursive resolve resolved objects
			async.map(references, function(reference, callback) {
				if (typeof reference.value !== 'object') return callback(null, reference);

				resolveFileReferences(reference.value, reference.path, function() {
					callback(null, reference.value);
				})
			}, function() {
				callback(source);
			});

		});
	}

	function collectReferences(source) {
		var result = [];

		std.forEachValueRecursive(source, function(obj, key, value) {
			if (typeof value !== 'string') return;
			if (value.indexOf('include:') !== 0) return;

			result.push({
				obj: obj,
				key: key,
				path: value.substr(8)
			});
		});

		return result;
	}

	function resolveReference(reference, callback) {
		var extension = path.extname(reference.path).toLowerCase();
		var value;
		var readFunc = extension === '.json' ? parseJsonFile : readFile;

		readFunc(reference.path, function(content) {
			reference.value = content;
			reference.obj[reference.key] = reference.value;
			callback(null, reference);
		});
	}

	return resolveFileReferences;
}
