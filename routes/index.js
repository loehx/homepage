var express = require('express')
var router = express.Router()
var MainController = require('../controllers/main')
var mainController = new MainController()
var beautifier = require('js-beautify')

router.get('*', function(req, res, next) {
    var path = req.path === '/' ? '/en/home' : req.path
    
    mainController.getModel(path, function(err, model) {
        if (err || !model) return next()
        res.render(model.view, model, function(err, html) {
            if (err) return next(err)
            html = beautifier.html(html)
            res.send(html)
        })
    })
});

module.exports = router