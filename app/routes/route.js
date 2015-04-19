var express = require('express');
var router = express.Router();
var index = require('../controllers/controller');

module.exports = function(app) {
   
    router.post('/users/signup', index.signup);
    router.post('/users/login', index.login);
    router.get("/users/:name", index.retreiveUsers);
    //create tag
    router.route("/users/tag/:name")
    .put(index.editTag);

    router.post("/users/tag", index.createTag);
    //retreive all the tags belongin to a user, requires webtoken
    router.get("/users/tag", index.getUserTags);

    router.get("/tags/:name", index.retreiveTags);

    app.use('', router);

    //catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404).json({error: "The path does not exists"});
        next();
    });
}