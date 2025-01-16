"use client";
import { getBookingData } from "@/app/api/formhandeler";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BookCard({ user }) {
	const [BookingData, setBookingData] = useState({
		Hotels: "",
		error: null,
		loading: false,
	});

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				if (isMounted) {
					const result = await getBookingData();
					setBookingData({
						Hotels: result.BookingList,
						error: null,
						loading: false,
					});
				}
			} catch (error) {
				if (isMounted) {
					console.error("Error fetching data:", error);
					setBookingData({
						Hotels: [],
						error: "Error fetching data",
						loading: false,
					});
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
			console.log("Cleanup: Component unmounted or dependencies changed");
		};
	}, []);
	const Length =
		BookingData?.Hotels &&
		BookingData?.Hotels?.filter(
			(ee) => ee?.name == user?.name && ee?.email == user?.email
		).length;
	console.log(Length);
	return (
		<>
			<div className="space-y-4">
				{BookingData?.Hotels &&
					BookingData?.Hotels.filter(
						(e) => e?.name === user?.name && e?.email === user?.email
					).map((e) => (
						<div
							key={e._id}
							className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
						>
							<div className="flex items-center space-x-4">
								<Image
									width={300}
									height={300}
									src={e.thumbNailUrl}
									alt="Property Thumbnail"
									className="w-24 h-24 object-cover rounded-md"
								/>
								<div>
									<h2 className="text-lg text-zinc-800 font-semibold">
										{e.Hotel_Name}
									</h2>
									<p className="text-zinc-500 text-sm">
										Booking Date: {e.check_In_Date}
									</p>
									<p className="text-zinc-500 text-sm">Booking Code: {e._id}</p>
								</div>
							</div>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:brightness-90">
									View Trip Details
								</button>
								<button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
									<i className="fas fa-download mr-2"></i>
									Download Receipt
								</button>
							</div>
						</div>
					))}
				{Length == 0 && (
					<div className="text-center py-12">
						<Image
							width={300}
							height={300}
							src="/logo.svg"
							alt="No Bookings"
							className="mx-auto mb-4 w-32 h-32"
						/>
						<h2 className="text-2xl font-semibold text-gray-800 mb-2">
							No Bookings Yet
						</h2>
						<p className="text-zinc-500 text-sm">
							You {"haven't"} made any bookings. Start exploring amazing stays!
						</p>
					</div>
				)}
			</div>
		</>
	);
}
