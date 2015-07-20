var express = require('express')
var router = express.Router()
var MainController = require('../controllers/main')
var mainController = new MainController()

router.get('*', function(req, res, next) {
    console.log('GET model for: "' + req.path + '" ...')  // DEBUG
    mainController.get(req.path, function(err, model) {
        console.log('MODEL ', err || model); // DEBUG
        if (err || !model) return next()
        res.render('index', model)
    })
});

module.exports = router