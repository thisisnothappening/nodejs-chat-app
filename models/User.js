const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	email: String,
	username: String,
	password: String,
	refreshToken: String,
}, {
	versionKey: false
})

module.exports = mongoose.model("User", userSchema)