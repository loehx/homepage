module.exports = function log() {
    return console.log;
}

log.shared = true;
