import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/ClientPromise";
import { OldUser } from "./app/models/user";
import connectMongo from "./dbConnect/connectDB";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	// MongoDB Adapter use for storing google signin user data
	adapter: MongoDBAdapter(client),

	session: {
		strategy: "jwt", // Using JWT for sessions for Credential data storadge
	},

	providers: [
		// Credentials Provider
		CredentialsProvider({
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "user@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}
				await connectMongo();
				try {
					const LogInUser = await OldUser.findOne({
						email: credentials.email,
					});

					if (LogInUser) {
						const isMatched = LogInUser.password === credentials.password;

						if (isMatched) {
							return LogInUser;
						} else {
							throw new Error("Email or password is incorrect");
						}
					} else {
						throw new Error("User not found");
					}
				} catch (err) {
					throw new Error(err.message || "Authorization error");
				}
			},
		}),

		// Google Provider
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],

	trustHost: true,
});
