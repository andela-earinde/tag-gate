var app = require("../../server"),
    request = require("supertest"),
    jwt = require("jsonwebtoken"),
    config = require("../../config/config"),
    req = require("request");

describe("Route Test: Testing if the gateway works properly", function() {

    beforeEach(function(done) {
        req.post({url: config.url.signup, form: {
             username: "eniola",
             password: "opeyemi",
             firstname: "crap",
             lastname: "thestuff",
             email: "eni@arinde"  
        }}, function(err, httpres, body) {
            if(err) {
                console.log(err);
            }
            console.log("created")
        });
         setTimeout(function(){
                    done();
         }, 5000); 
    }, 6000);

    afterEach(function(done) {
        req.post({url: config.url.remove, form: {
             username: "eniola"
        }}, function(err, httpres, body) {
            if(err) {
                console.log(err);
            }
            console.log("deleted");
        });
         setTimeout(function(){
                    done();
         }, 5000)    
    }, 6000);
    
	describe("it should signup the user when POST /users/signup route is called", function() {
        it("should request the user service and and return success when succesful", function(done) {
        	request(app).post("/users/signup")
        	    .send({
                    username: "leke",
                    password: "shit",
                    firstname: "crap",
                    lastname: "thestuff",
                    email: "sasa@dsasas"
                })
        	    .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                    	console.log(err);
                    }
                	expect(res.body).toEqual(jasmine.objectContaining({
                		success: "User created"
                	}));
                });
                setTimeout(function(){
                    done();
                }, 5000);
        }, 6000);
    });

    describe("It should login the user when POST /users/login route is called", function() {   
        it("should request the user service to login and return success with a token", function(done) {
            request(app).post("/users/login")
                .send({
                    email: "eni@arinde",
                    password: "opeyemi"
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) {
                        console.log(err);
                    }
                    var payload = jwt.verify(res.body.token, "elvongray");
                    expect(payload).toEqual(jasmine.objectContaining({
                        username: "eniola",
                        email: "eni@arinde"
                    }));
                })
                 setTimeout(function(){
                    done();
                }, 5000); 
        }, 6000);
    });
});




