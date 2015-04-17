
var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

module.exports = function() {
	var app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(methodOverride());

	require('../app/routes/route')(app);

	return app;
}