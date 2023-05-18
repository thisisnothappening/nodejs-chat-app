const mongoose = require("mongoose")

const DB_NAME = 'temp_database';

async function resetDatabase() {
	try {
		await mongoose.connection.dropDatabase();
		console.log(`Database "${DB_NAME}" dropped`);

		await mongoose.connection.db.admin().createDatabase(DB_NAME);
		console.log(`Database "${DB_NAME}" created`);
	} catch (err) {
		console.error(err);
	}
}

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		console.log('Connected to MongoDB...');
		// resetDatabase() // do not uncomment this until we have a bulkCreate or similar
	} catch (err) {
		console.error(err)
	}
}

module.exports = { connectDB }