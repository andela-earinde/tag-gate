var express = require('express');
var router = express.Router();
var index = require('../controllers/controller');

module.exports = function(app) {
   /*
    *  This routing is shit: Update it!!!!!
    */
   
    router.post('/users/signup', index.signup);
    router.post('/users/login', index.login);
    router.get("/users/:name", index.retreiveUsers);
    router.put("/users/edit", index.editUserAccount);
    router.delete("/users/delete", index.deleteUserAccount);
    //create tag
   
    router.route("/users/tag")
    .post(index.createTag);

    router.get("/user/tags/:name",index.getUserTag);

    router.route("/users/tag/:name")
    .put(index.editTag);

    router.get("/tags/:name", index.retreiveTags);

    app.use('', router);

    //catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404).json({error: "The path does not exists"});
        next();
    });
}