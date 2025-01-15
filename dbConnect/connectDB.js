import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const cached = {};

async function connectMongo() {
	// Check if MONGO_URI is defined
	if (!MONGO_URI) {
		throw new Error(
			"Please define the MONGO_URI environment variable inside .env.local"
		);
	}

	// If already connected, return the cached connection
	if (cached.connection) {
		console.log("Using cached MongoDB connection");
		return cached.connection;
	}

	// If no existing connection, initiate a new one
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		// Store the promise so the connection is only established once
		cached.promise = mongoose
			.connect(MONGO_URI, opts)
			.then((mongooseInstance) => {
				console.log("MongoDB connected");
				return mongooseInstance;
			});
	}

	try {
		// Wait for the promise to resolve and cache the connection
		cached.connection = await cached.promise;
	} catch (e) {
		cached.promise = undefined; // Reset the promise on failure
		throw e;
	}

	return cached.connection;
}

export default connectMongo;
