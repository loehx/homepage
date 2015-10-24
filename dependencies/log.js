function log() {
    return console.log;
}

log.shared = true;
module.exports = log;
