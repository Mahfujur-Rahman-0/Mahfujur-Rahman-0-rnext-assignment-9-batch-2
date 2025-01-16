import { auth } from "@/auth";
import BookCard from "./BookCard";
import Image from "next/image";

export default async function Bookings() {
	const { user } = await auth();
	return (
		<div className="bg-gray-50 text-gray-900 font-sans">
			<div className="max-w-4xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">My Bookings</h1>

				<BookCard user={user} />
			</div>
		</div>
	);
}
