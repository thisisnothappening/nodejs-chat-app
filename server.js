const { ApolloServer } = require("apollo-server-express")
const { typeDefs } = require("./apollo/typeDefs")
const { resolvers } = require("./apollo/resolvers")
const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require("cors")
require("dotenv").config()
require("./config/database").connectDB()

const app = express()

app.use(cookieParser())

// app.use(cors({
// 	origin: "*",
// 	credentials: true,
// 	allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Credentials', true);
// 	if (req.method === 'OPTIONS') {
// 		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
// 		return res.status(200).json({});
// 	}
// 	next();
// });

// app.use((err, req, res, next) => {
// 	console.error(err.stack);
// 	res.status(500).send('Something broke!');
// });

const server = new ApolloServer({
	typeDefs,
	resolvers,
	// context: ({ req, res }) => ({ req, res }),
	// playground: {
	// 	settings: {
	// 		'request.credentials': 'include'
	// 	}
	// },
	// cors: {
	// 	origin: "*",
	// 	credentials: true,
	// },
})

const port = process.env.PORT || 8080

async function startServer() {
	await server.start()

	server.applyMiddleware({ app })

	app.listen(port, () => {
		console.log(`Server started on port ${port}`)
	})
}

startServer()