var request = require("request"),
    config = require("../../config/config"),
    jwt = require("jsonwebtoken");

exports.signup = function(req, res) {
    request.post({url: config.url.signup,
                  form: req.body}, function(err, httpres, body) {
                  	if(err) {
                  		console.log(err);
                  	}
                  	else{
                        var body = JSON.parse(body);
                        res.json(body);
                  	}
                  });
}

exports.login = function(req, res) {
     request.post({url: config.url.login,
                  form: req.body}, function(err, httpres, body) {
                    if(err) {
                  		console.log(err);
                  	}
                  	else{
                        var body = JSON.parse(body);
                        res.json(body);
                  	}
                  });	
}

exports.retreiveUsers = function(req, res) {
	if(req.params.name === "all") {
        request.get({url: config.url.allUsers},
        	      function(err, httpres, body) {
                    if(err) {
                  		console.log(err);
                  	}
                  	else{
                        var body = JSON.parse(body);
                        res.json(body);
                  	}
                  });		
	}
	else {
		res.json({});
	}
}

exports.retreiveTags = function(req, res) {
	if(req.params.name === "all") {
        request.get({url: config.tagurl.allTags},
        	      function(err, httpres, body) {
                     var body = JSON.parse(body);
                     res.json(body);
                  });		
	}
	else {
		res.json({});
	}
}

exports.createTag = function(req, res) {
	try{
		var payload = jwt.verify(req.headers.authorization, "elvongray");

		request.post({url: config.tagurl.allTags,
		              form: {
		              	tagName: req.body.tagName,
		              	description: req.body.description,
		              	author: payload.username
		              }}, function(err, httpres, body) {
		              	 if(err) {
		              	 	console.log(err);
		              	 }
		                 else {
		                     var body = JSON.parse(body);
		                     res.json(body);	
		                 }
		              });	   
    }
    catch(err) {
    	if(err.name === "JsonWebTokenError"){
    	     res.json({error: "Invalid token"});
    	}
    	else{
    		throw err;
    	}
    }
}

exports.editTag = function(req, res) {
	try {
      var payload = jwt.verify(req.headers.authorization, "elvongray");

      request.put({url: config.tagurl.allTags+"/"+req.params.name,
                  form: {
                  	tagName: req.body.tagName,
                  	description: req.body.description,
                  	author: payload.username
                  }}, function(err, httpres, body) {
                  	 if(err) {
                  	 	console.log(err);
                  	 }
                     else {
                         var body = JSON.parse(body);
                         res.json(body);	
                     }
                  });	
	}
	catch(err) {
	    if(err.name === "JsonWebTokenError"){
    	     res.json({error: "Invalid token"});
    	}
    	else{
    		throw err;
    	}	
	}
   
}









