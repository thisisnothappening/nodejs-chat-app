const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const loginUser = async (login, res) => {
	try {
		const { emailOrUsername, password } = login;

		if (!emailOrUsername || !password) {
			throw new Error("Field cannot be null");
		}

		let user
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailOrUsername))
			user = await User.findOne({ email: emailOrUsername });
		else
			user = await User.findOne({ username: emailOrUsername });
		
		if (!user) 
			throw new Error("User not found");

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) 
			throw new Error("Incorrect password");

		const accessToken = jwt.sign(
			{ id: user.id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30m' }
		);
		const refreshToken = jwt.sign(
			{ id: user.id },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		user.refreshToken = refreshToken;
		await user.save();

		res.cookie("token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 24 * 60 * 60 * 1000
		})
			.send({ accessToken });
	} catch (err) {
		console.error(err);
		return new Error(err.message)
	}
};

module.exports = {
	loginUser
};