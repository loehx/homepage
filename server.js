var app = require('./app')
var port = process.env.PORT || 27015

app.listen(port, function() {
    console.log('Homepage started at http://localhost:' + port);
})
