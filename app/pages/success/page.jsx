"use client";
import UseContextApi from "@/app/Context/Context";
import Image from "next/image";

export default function success() {
	const { recet, setRecet } = UseContextApi();
	console.log(recet);
	return (
		<div className="bg-gray-50">
			<div className="max-w-3xl mx-auto p-6">
				{/* <!-- Success Message Section --> */}
				<div className="text-center my-12">
					<div className="inline-block p-4 bg-green-100 rounded-full mb-6">
						<i className="fas fa-check-circle text-4xl text-primary"></i>
					</div>
					<h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
					<p className="text-zinc-600 mb-8">
						Your booking has been confirmed. Check your email for details.
					</p>
				</div>

				{/* <!-- Booking Details Card --> */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<div className="flex items-start gap-6 mb-6 pb-6 border-b">
						<Image
							width={300}
							height={300}
							src={recet?.thumbNailUrl}
							alt="Property"
							className="w-32 h-32 rounded-lg object-cover"
						/>
						<div>
							<h2 className="text-2xl font-semibold mb-2">
								{recet?.Hotel_Name}
							</h2>
							<div className="flex items-center mb-2">
								<i className="fas fa-star text-sm mr-1"></i>
								<span className="text-sm">4.6 (500+ reviews)</span>
							</div>
							<p className="text-zinc-600">
								One room and one living room with a straight sea view....
							</p>
						</div>
					</div>

					{/* <!-- Reservation Details --> */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-semibold mb-4">Reservation Details</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-zinc-600 text-sm">Check-in</span>
									<span className="text-zinc-500 text-sm">
										{recet?.check_In_Date}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-zinc-600 text-sm">Check-out</span>
									<span className="text-zinc-500 text-sm">
										{recet?.check_Out_Date}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-zinc-600 text-sm">Guests</span>
									<span className="text-zinc-500 text-sm">
										{recet?.guests} guest
									</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Payment Summary</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-zinc-600">Total amount paid</span>
									<span className="font-semibold">${recet?.Total}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-zinc-600 text-sm">Booking ID</span>
									<span>{recet?.id}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- Next Steps --> */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<h3 className="text-xl font-semibold mb-6">Next Steps</h3>
					<div className="space-y-6">
						<div className="flex gap-4">
							<div className="text-primary">
								<i className="fas fa-envelope text-xl"></i>
							</div>
							<div>
								<h4 className="font-semibold mb-1">Check your email</h4>
								<p className="text-zinc-600">
									{"We've"} sent your confirmation and trip details to your
									email address.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="text-primary">
								<i className="fas fa-comment-alt text-xl"></i>
							</div>
							<div>
								<h4 className="font-semibold mb-1">Message your host</h4>
								<p className="text-zinc-600">
									Introduce yourself and let them know your travel plans.
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="text-primary">
								<i className="fas fa-suitcase text-xl"></i>
							</div>
							<div>
								<h4 className="font-semibold mb-1">Plan your trip</h4>
								<p className="text-zinc-600">
									Review house rules and check-in instructions in your trip
									details.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- Action Buttons --> */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-90">
						<i className="fas fa-download mr-2"></i>
						Download Receipt
					</button>
				</div>

				{/* <!-- Need Help Section --> */}
				<div className="mt-12 text-center">
					<p className="text-zinc-600">Need help with your booking?</p>
					<a href="#" className="text-primary hover:underline">
						Visit our Help Center
					</a>
				</div>
			</div>
		</div>
	);
}
