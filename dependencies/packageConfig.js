module.exports = function(parseJsonFile, projectDir, path) {
    return parseJsonFile(path.join(projectDir, 'package.json'));
}
