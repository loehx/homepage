var dependencies = require("../index")();
var assert = require("assert");


describe("readFile", function() {
    it("Should read a simple text file (sync)", function(done) {
        dependencies.resolve(function(readFile, fs) {
            var content = readFile(__filename);
            assert.equal(fs.readFileSync(__filename), content);
            done();
        })
    }) 

    it("Should read a simple text file (async)", function(done) {
        dependencies.resolve(function(readFile, fs) {
            readFile(__filename, function(content) {
                assert.equal(fs.readFileSync(__filename), content);
                done();
            });
        })
    })
})
