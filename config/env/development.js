module.exports = {
	url: {
		signup: "http://localhost:7000/api/users/signup",
		login: "http://localhost:7000/api/users/login",
		remove: "http://localhost:7000/api/users/remove",
		allUsers: "http://localhost:7000/api/users"
	},

	tagurl: {
		allTags: "http://localhost:8080/api/tags"
	},

	corsOptions: {
		origin: "http://localhost:8000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"]
	}
}