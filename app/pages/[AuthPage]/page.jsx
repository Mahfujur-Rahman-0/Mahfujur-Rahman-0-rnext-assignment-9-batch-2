import LogIn from "@/app/components/LogIn";
import SignUp from "@/app/components/SignUp";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthPage({ params }) {
	const { AuthPage } = params;
	const checker = await auth();

	if (checker) {
		redirect("/");
	}

	return AuthPage === "LogIn" ? <LogIn /> : <SignUp />;
}
