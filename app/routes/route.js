var express = require('express');
var router = express.Router();
var index = require('../controllers/controller');

module.exports = function(app) {
   
    router.post('users/signup', index.signup);
    router.post('users/login', index.login);
    router.post("")

    app.use('/', router);

    //catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404).json({error: "The path does not exists"});
        next();
    });
}