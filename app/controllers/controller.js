var request = require("request"),
    config = require("../../config/config");

exports.signup = function(req, res) {
    request.post({url: config.url.signup,
                  form: req.body}, function(err, httpres, body) {
                     var body = JSON.parse(body);
                     res.json(body);
                  });
}

exports.login = function(req, res) {
     request.post({url: config.url.login,
                  form: req.body}, function(err, httpres, body) {
                     var body = JSON.parse(body);
                     res.json(body);
                  });	
}