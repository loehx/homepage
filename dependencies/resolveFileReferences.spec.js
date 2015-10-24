var dependencies = require('../dependencies');
var assert = require("assert");

describe("resolveFileReferences - Resolving of JSON files", function() {

	beforeEach(function() {
		dependencies.register('parseJsonFile', function() {
			return function(path, callback) {
				assert.equal("C:\\test\\test.json", path);
				callback({
					works: true
				});
			}
		});
	})

	it("should resolve a reference", function(done) {
		var source = {
			fileA: "include:test/test.json"
		};

		dependencies.resolve(function(resolveFileReferences) {
			assert(resolveFileReferences, "Should resolve resolveFileReferences.");
			resolveFileReferences(source, "C:/", function(resolvedSource) {
				assert(source, "Should not be empty");
				assert.deepEqual(resolvedSource, source);
				assert.deepEqual(resolvedSource, {
					fileA: {
						works: true
					}
				});
				done();
			});
		});
	});


	it("should resolve a reference from a sub object", function(done) {
		var source = {
			fileA: {
				content: "include:/test/test.json"
			}
		};

		dependencies.resolve(function(resolveFileReferences) {
			assert(resolveFileReferences, "Should resolve resolveFileReferences.");
			resolveFileReferences(source, "C:/", function(resolvedSource) {
				assert(source, "Should not be empty");
				assert.deepEqual(resolvedSource, source);
				assert.deepEqual(resolvedSource, {
					fileA: {
						content: {
							works: true
						}
					}
				});
				done();
			});
		});
	});


	it("should resolve multiple references from an array", function(done) {
		var source = {
			fileA: ["include:/test/test.json", "include:./test/test.json"]
		};

		dependencies.resolve(function(resolveFileReferences) {
			assert(resolveFileReferences, "Should resolve resolveFileReferences.");
			resolveFileReferences(source, "C:/", function(resolvedSource) {
				assert(source, "Should not be empty");
				assert.deepEqual(resolvedSource, source);
				assert.deepEqual(resolvedSource, {
					fileA: [{
						works: true
					}, {
						works: true
					}]
				});
				done();
			});
		});
	});
});



describe("resolveFileReferences - Resolving of text files", function() {

	it("should resolve a reference to a text file", function(done) {
		var source = {
			fileA: "include:resolveFileReferences.spec.js"
		};

		dependencies.resolve(function(resolveFileReferences) {
			assert(resolveFileReferences, "Should resolve resolveFileReferences.");
			resolveFileReferences(source, __dirname, function(resolvedSource) {
				assert(source, "Should not be empty");
				assert.deepEqual(resolvedSource, source);
				assert.deepEqual(resolvedSource, {
					fileA: require('fs').readFileSync(__dirname + '/resolveFileReferences.spec.js').toString()
				});
				done();
			});
		});
	});
});
