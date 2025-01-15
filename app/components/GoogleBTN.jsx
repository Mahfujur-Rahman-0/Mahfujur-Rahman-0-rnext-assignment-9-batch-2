"use server";

import { signOut, signIn } from "@/auth";

export default async function SignoutBTN() {
	await signOut();
}

export async function SignInBTN() {
	await signIn("google");
}
export async function LogInAuthBtn(LogData) {
	try {
		const responce = await signIn("credentials", {
			email: LogData.get("email"),
			password: LogData.get("password"),
			redirect: false,
		});

		return responce;
	} catch (err) {
		return null;
	}
}
