const User = require('../models/User');

const getUsers = async () => {
	return await User.find()
}

const getUserById = async () => {
	return await User.findById(id)
}

const updateUser = async (id, user) => {
	try {
		const existingUser = await User.findById(id)
		if (!existingUser) throw new Error("User not found")
		return await User.findByIdAndUpdate(id, {
			email: user.email,
			username: user.username,
			password: user.password
		}, { new: true })
	} catch (err) {
		console.error(err)
		return new Error(err.message)
	}
}

const deleteUser = async (id) => {
	try {
		const user = await User.findByIdAndDelete(id)
		if (!user) throw new Error("User not found")
		return "User deleted"
	} catch (err) {
		console.error(err)
		return new Error(err.message)
	}
}

module.exports = {
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
}