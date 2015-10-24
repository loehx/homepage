var dependencies = require('../dependencies');
var assert = require("assert");

describe("getModel", function() {
	it("should get model for home", function(done) {

		dependencies.resolve(function(getModel) {
			getModel('/en/home', function(model) {
				assert(model, "Model could be resolved.");
				assert.equal(model.lang, 'en');
				assert(model.author, "author should be set in settings");
				done();
			})
		})
	})
})
