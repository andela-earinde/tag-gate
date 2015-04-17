var request = require("request");

exports.signup = function(req, res) {
    request.post({url: "https://user-tag.herokuapp.com/api/users/signup",
                  form: req.body}, function(err, httpres, body) {
                     var body = JSON.parse(body);
                  
                     res.json(body);
                  });
}