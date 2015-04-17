var app = require("../../server"),
    request = require("supertest"),
    req = require("request");

describe("Route Test: Testing if the gateway works properly", function() {
    
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
                    done();
                });
        });

        it("should throw an error if the username already exists when signing up", function(done) {
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
                    expect
                })
        });
	});
});




