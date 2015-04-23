module.exports = {
  url: {
    signup: "https://user-tag.herokuapp.com/api/users/signup",
    login: "https://user-tag.herokuapp.com/api/users/login",
    remove: "https://user-tag.herokuapp.com/api/users/remove",
    allUsers: "https://user-tag.herokuapp.com/api/users"
  },

  tagurl: {
    allTags: "https://mean-tag.herokuapp.com/api/tags"
  },

  corsOptions: {
    origin: "https://tag-gate.herokuapp.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
}