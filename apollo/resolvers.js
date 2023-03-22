const {
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("../resolvers/userResolver")
const {
	createUser
} = require("../resolvers/registerResolver")
const {
	loginUser
} = require("../resolvers/loginResolver")

// resolver parameters: obj / parent, args, context, info

const resolvers = {
	Query: {
		async users() {
			return await getUsers()
		},
		async user(_, { id }) {
			return await getUserById(id)
		}
	},

	Mutation: {
		async createUser(_, { user }) {
			return await createUser(user)
		},
		async updateUser(_, { id, user }) {
			return await updateUser(id, user)
		},
		async deleteUser(_, { id }) {
			return await deleteUser(id)
		},
		async loginUser(_, { login }, { res }) {
			return await loginUser(login, res)
		}
	}
}

module.exports = { resolvers }