const { gql } = require("apollo-server-express")

const typeDefs = gql`
	type User {
		id: ID!
		email: String!
		username: String!
		password: String!
		refreshToken: String
	}

	input UserInput {
		email: String!
		username: String!
		password: String!
	}

	input LoginInput {
		emailOrUsername: String!
		password: String!
	}

	# Queries
	type Query {
		users: [User!]!
		user(id: ID!): User
	}

	# Mutations
	type Mutation {
		createUser(user: UserInput!): String
		updateUser(id: ID!, user: UserInput!): User
		deleteUser(id: ID!): String
		loginUser(login: LoginInput!): String
	}
`

module.exports = { typeDefs }