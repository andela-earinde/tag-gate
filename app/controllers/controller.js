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

exports.signout = function(req, res) {
    jwt.verify(req.headers.authorization, "elvongray", function(err, payload) {
    	if(err) {
    		res.json({error: "Invalid Token"});
    	}
    	else {
    	    request.post({url: config.url.allUsers+"/signout",
                  form: {username: payload.username}}, function(err, httpres, body) {
                  	if(err) {
                  		console.log(err);
                  	}
                  	else{
                        var body = JSON.parse(body);
                        res.json(body);
                  	}
                });	
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

//edit users account
exports.editUserAccount = function(req, res) {
	jwt.verify(req.headers.authorization, "elvongray", function(err, payload) {
	    if(err) {
	        res.json({error: "invalid Token"});
	    }
	    else {
	    	req.body.inituser = payload.username;
	        request.put({url: config.url.allUsers+"/edit",
                  form: req.body}, function(err, httpres, body) {
                    if(err) {
                  		console.log(err);
                  	}
                  	else{
                        var body = JSON.parse(body);
                        //request to mongoose for name change here
                        if(body.error) {
                        	res.json({error: "Invalid credential"});
                        }
                        else{
	                        request.put({url: config.tagurl.allTags,
	                            form: {
					              	username: req.body.inituser,				        
					              	author: req.body.username
					              }}, function(err, httpres, monBody) {
					                  	 if(err) {
					                  	 	console.log(err);
					                  	 }
					                     else {
					                         var monBody = JSON.parse(monBody);
					                         res.json({
					                         	postgres: body,
					                         	mongo: monBody
					                         });	
					                     }
	                        });
	                    }
                  	}
                });	
	    }
	});
}

//retrieve all the tags belonging to a user
exports.getUserTag = function(req, res) {
   
     request.get({url: config.tagurl.allTags+"/user/"+req.params.name},
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

//delete user account, requires a token
exports.deleteUserAccount = function(req, res) {
    jwt.verify(req.headers.authorization, "elvongray", function(err, payload) {
		if(err) {
            res.json({error: "Invalid Token"});
		}
		else {
            request.del({url: config.url.allUsers+"/delete",
		              form: {
		              	username: payload.username
		              }}, function(err, httpres, body) {
		              	 if(err) {
		              	 	console.log(err);
		              	 }
		                 else {
		                     var body = JSON.parse(body);
		                     if(body.error) {
		                     	res.json({error: "Invalid credentials"});
		                     }
		                     else {
		                          request.del({url: config.tagurl.allTags+"/user/"+payload.username,
			                            form: {
							              	username: req.body.inituser,				        
							              	author: req.body.username
							              }}, function(err, httpres, monBody) {
							                  	 if(err) {
							                  	 	console.log(err);
							                  	 }
							                     else {
							                         var monBody = JSON.parse(monBody);
							                         res.json({
							                         	postgres: body,
							                         	mongo: monBody
							                         });	
							                     }
			                        });   
		                     }	
		                 }
		    });
		}
	});	
}

//delete a user tag
exports.deleteUserTag = function(req, res) {
     jwt.verify(req.headers.authorization, "elvongray", function(err, payload){
          if(err) {
              res.json({error: "Invalid Token"});
          }
          else {
              request.del({url: config.tagurl.allTags+"/user"+req.body.tagName,
                  form: {
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
      });		
}

//retrieve all tags in the database
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

//create a new tag, requires a token
exports.createTag = function(req, res) {
	
	jwt.verify(req.headers.authorization, "elvongray", function(err, payload) {
		if(err) {
            res.json({error: "Invalid Token"});
		}
		else {
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
	});
}

//edit a particular tag, requires a token
exports.editTag = function(req, res) {

      jwt.verify(req.headers.authorization, "elvongray", function(err, payload){
          if(err) {
              res.json({error: "Invalid Token"});
          }
          else {
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
      });	
}









