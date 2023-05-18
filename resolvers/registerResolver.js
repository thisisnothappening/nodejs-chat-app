const User = require("../models/User");
const bcrypt = require("bcrypt")

// https://www.w3resource.com/javascript/form/email-validation.php
// https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

const createUser = async (user) => {
	try {
		const { email, username, password } = user;

		if (!email || !username || !password)
			throw new Error("Field cannot be null")

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
			throw new Error("Invalid email")

		// 1. Only contains alphanumeric characters, underscore and dot.
		// 2. Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
		// 3. Underscore and dot can't be next to each other (e.g user_.name).
		// 4. Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
		// 5. Number of characters must be between 8 to 20.
		if (!/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username))
			throw new Error("Invalid username");

		// 1. At least one upper case English letter, (?=.*?[A-Z])
		// 2. At least one lower case English letter, (?=.*?[a-z])
		// 3. At least one digit, (?=.*?[0-9])
		// 4. At least one special character, (?=.*?[#?!@$%^&*-])
		// 5. Minimum eight in length .{8,} (with the anchors)
		if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,20}$/.test(password)) 
			throw new Error("Invalid password");

		const userCheck = await User.findOne({ email: email });
		if (userCheck) 
			throw new Error("Email already exists");

		const hashedPassword = await bcrypt.hash(password, 10);

		await User.create({
			email: email,
			username: username,
			password: hashedPassword,
		});

		return "User created!"
	} catch (err) {
		console.error(err)
		return new Error(err.message)
	}
}

module.exports = { createUser }