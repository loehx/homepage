var app = require('./app')


var port = process.env.OPENSHIFT_NODEJS_PORT || 27015
var host = process.env.OPENSHIFT_NODEJS_IP || 'localhost'

app.listen(port, host, function() {
    console.log('Homepage started at http://' + host + ':' + port);
})
