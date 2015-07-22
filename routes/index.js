var express = require('express')
var router = express.Router()
var MainController = require('../controllers/main')
var mainController = new MainController()


router.get('/:lang?', function(req, res, next) {
    var lang = req.params.lang || 'en'
    mainController.get(lang + '/home', function(err, model) {
        if (err || !model) return next()
        res.render('index', model)
    })
});

router.get('*', function(req, res, next) {
    mainController.get(req.path, function(err, model) {
        if (err || !model) return next()
        res.render('index', model)
    })
});

module.exports = router