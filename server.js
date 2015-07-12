var app = require('./app')

var host = process.env.IP
var port = process.env.PORT

app.listen(port, host, function() {
    console.log('Homepage started at ' + host + ':' + port + '.')
})