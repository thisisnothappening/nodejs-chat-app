const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: {
		type: String,
		required: false,
	},
}, {
	versionKey: false
})

const User = mongoose.model("User", userSchema)

module.exports = User