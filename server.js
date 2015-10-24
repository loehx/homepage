var app = require('./app')

var host = process.env.IP || 'localhost';
var port = process.env.PORT || 27015;

app.listen(port, host, function() {
    console.log('Homepage started at http://' + host + ':' + port);
})
