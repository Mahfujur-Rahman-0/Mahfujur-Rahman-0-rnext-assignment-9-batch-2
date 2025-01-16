"use client";
import { Boocking } from "@/app/api/formhandeler";
import UseContextApi from "@/app/Context/Context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PaymentProcess() {
	const CleaningFee = 17.5;
	const ServiceFee = 51.31;

	//clean and service fees
	const router = useRouter();
	const {
		ReserveData,
		setReserveData,
		BookingHotelData,
		setBookingHotelData,
		user,
	} = UseContextApi();

	const [checkInDate, setCheckInDate] = useState(ReserveData.CheckinDate);
	const [checkOutDate, setCheckOutDate] = useState(ReserveData.CheckOutDate);
	const [guests, setGuests] = useState(ReserveData.GuestNum);
	const [show, setShow] = useState(true);
	const [Guest, setGuest] = useState(true);
	const [DateST, setDateST] = useState({
		check_In_Date: "",
		check_Out_Date: "",
		Nights: "",
	});

	async function HandelSave() {
		await setReserveData({
			CheckinDate: checkInDate,
			CheckOutDate: checkOutDate,
			GuestNum: guests,
			Nights: DateST.Nights,
		});
	}

	useEffect(() => {
		const formatDate = (date) => {
			const day = date.getDate().toString().padStart(2, "0");
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const year = date.getFullYear().toString();
			return `${day}-${month}-${year}`;
		};

		if (checkInDate) {
			setDateST((prevState) => ({
				...prevState,
				check_In_Date: formatDate(checkInDate),
			}));
		}

		if (checkOutDate) {
			setDateST((prevState) => ({
				...prevState,
				check_Out_Date: formatDate(checkOutDate),
			}));

			const nightDifference =
				(checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
			setDateST((prevState) => ({
				...prevState,
				Nights: nightDifference,
			}));
		}
	}, [checkOutDate, checkInDate]);

	const Total = BookingHotelData?.pricePerNight
		? BookingHotelData?.pricePerNight * DateST?.Nights +
		  CleaningFee +
		  ServiceFee
		: 0;
	//Booking func
	async function HandelBook(e) {
		console.log("submiting...");
		try {
			const res = await Boocking(
				BookingHotelData._id,
				e,
				user,
				BookingHotelData,
				DateST,
				Total,
				ServiceFee,
				CleaningFee,
				guests,
				1
			);

			await setBookingHotelData("");
			if (res.message == "successfully") {
				router.push("/pages/success");
			}
		} catch (err) {
			console.log(err);
		}
	}

	console.log(DateST); //checkin date,checkout date, night
	console.log(BookingHotelData);

	return (
		<form action={HandelBook}>
			<div className="bg-gray-50">
				<div className="max-w-7xl mx-auto px-6 py-8">
					{/* <!-- Back Button --> */}
					<div className="mb-8">
						<Link
							href={`${
								BookingHotelData?._id
									? "/pages/SinglePage/" + BookingHotelData._id
									: "/pages/SinglePage"
							}`}
							className="text-zinc-800 hover:underline"
						>
							<i className="fas fa-chevron-left mr-2"></i>
							Request to book
						</Link>
					</div>

					{/* <!-- Main Content Grid --> */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{/* <!-- Left Column --> */}
						<div>
							<section className="mb-8">
								<h2 className="text-xl font-semibold mb-4">Your trip</h2>

								{/* <!-- Dates --> */}
								<div className="flex justify-between items-center mb-4">
									<div>
										<h3 className="font-medium">Dates</h3>
										<p className="text-zinc-600 text-sm">
											{`Check in ${" " + " "}${DateST.check_In_Date}`}

											<span className="ml-7">
												{`Check out ${DateST.check_Out_Date}`}
											</span>
										</p>
										<p className="text-zinc-600 text-sm"></p>
									</div>
									<button
										type="button"
										onClick={() => setShow(false)}
										className="text-zinc-800 underline text-sm"
									>
										Edit
									</button>
									<div
										className={`${
											!show ? "block" : "hidden"
										} absolute left-1/3 z-50`}
									>
										<div className="bg-white shadow-lg rounded-xl p-6 border">
											{/* Price and Rating Section */}
											<div className="flex justify-between items-center mb-4">
												<div>
													<span className="text-xl font-bold">$450</span>
													<span className="text-gray-600 ml-1">per night</span>
												</div>
												<div className="flex items-center">
													<i className="fas fa-star text-yellow-500 mr-1"></i>
													<span>5</span>
												</div>
											</div>

											{/* Date Picker and Guests Input Section */}
											<div className="border rounded-lg mb-4">
												<div className="grid grid-cols-2 border-b">
													<div className="relative">
														<DatePicker
															selected={checkInDate}
															onChange={(date) => setCheckInDate(date)}
															selectsStart
															minDate={new Date()}
															startDate={checkInDate}
															endDate={checkOutDate}
															placeholderText="Check in"
															className="p-3 border-r w-full"
														/>
													</div>
													<div className="relative">
														<DatePicker
															onFocus={() => !checkInDate && setCheckInDate("")}
															selected={checkOutDate}
															onChange={(date) => {
																setCheckOutDate(date);
															}}
															selectsEnd
															startDate={checkInDate}
															endDate={checkOutDate}
															minDate={checkInDate}
															placeholderText="Check out"
															className={`p-3 w-full ${
																!checkInDate ? "border-red-500" : ""
															}`}
															disabled={checkInDate == "" && true}
														/>
													</div>
												</div>
											</div>
											{checkInDate == "" && (
												<p className="text-red-500 text-sm my-2">
													Please select a check-in date first.
												</p>
											)}
											{checkOutDate == "" && (
												<p className="text-red-500 text-sm my-2">
													Please select a check-out date.
												</p>
											)}
											{/* Reserve Button */}
											<div className="flex justify-between">
												<button
													type="button"
													onClick={() => setShow(true)}
													className=" w-24 block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
												>
													Cancel
												</button>
												<button
													type="button"
													onClick={() => {
														if (!checkInDate || !checkOutDate) {
															if (!checkInDate) {
																setCheckInDate("");
															} else if (!checkOutDate) {
																setCheckOutDate("");
															}
														} else {
															HandelSave();
														}
														setShow(true);
													}}
													className=" w-24 block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
												>
													Save
												</button>
											</div>
										</div>
									</div>
								</div>

								{/* <!-- Guests --> */}
								<div className="flex justify-between items-center">
									<div>
										<h3 className="font-medium">Guests</h3>
										<p className="text-zinc-600 text-sm">{guests} guest</p>
									</div>
									<button
										type="button"
										onClick={() => setGuest(false)}
										className="text-zinc-800 underline text-sm"
									>
										Edit
									</button>

									<div
										className={`${
											!Guest ? "block" : "hidden"
										} absolute left-1/3 z-50`}
									>
										<div className="bg-white shadow-lg rounded-xl p-6 border">
											{/* Price and Rating Section */}
											<div className="flex justify-between items-center">
												<div>
													<span className="text-xl font-bold">$450</span>
													<span className="text-gray-600 ml-1">per night</span>
												</div>
												<div className="flex items-center">
													<i className="fas fa-star text-yellow-500 mr-1"></i>
													<span>5</span>
												</div>
											</div>
											<input
												type="number"
												placeholder="Guests"
												value={guests}
												onChange={(e) => {
													const value = Number(e.target.value);
													if (value <= Number(BookingHotelData?.totalGuests)) {
														setGuests(value);
													}
												}}
												className={` ${Guest} w-full p-3 rounded-md my-5 border border-cyan-600`}
											/>
											{Number(guests) ==
												Number(BookingHotelData?.totalGuests) && (
												<p className="text-red-500 text-sm my-2">
													Guest limits full
												</p>
											)}
											{/* Reserve Button */}

											<button
												type="button"
												onClick={() => {
													setGuest(true);
												}}
												className="ml-auto w-24 block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
											>
												Save
											</button>
										</div>
									</div>
								</div>
							</section>

							{/* <!-- Payment Section --> */}
							<section className="mb-8">
								<h2 className="text-xl font-semibold mb-4">
									Pay with American Express
								</h2>
								<div className="space-y-4">
									<input
										name="Card_Number"
										type="text"
										placeholder="Card number"
										className="w-full p-3 border rounded-lg"
									/>

									<div className="grid grid-cols-2 gap-4">
										<input
											name="Expiration"
											type="text"
											placeholder="Expiration"
											className="p-3 border rounded-lg"
										/>
										<input
											name="CVV"
											type="text"
											placeholder="CVV"
											className="p-3 border rounded-lg"
										/>
									</div>
								</div>
							</section>

							{/* <!-- Billing Address --> */}
							<section className="mb-8">
								<h2 className="text-xl font-semibold mb-4">Billing address</h2>
								<div className="space-y-4">
									<input
										name="Street_address"
										type="text"
										placeholder="Street address"
										className="w-full p-3 border rounded-lg"
									/>
									<input
										name="Apt_or_suite_number"
										type="text"
										placeholder="Apt or suite number"
										className="w-full p-3 border rounded-lg"
									/>
									<input
										name="City"
										type="text"
										placeholder="City"
										className="w-full p-3 border rounded-lg"
									/>
									<div className="grid grid-cols-2 gap-4">
										<input
											name="State"
											type="text"
											placeholder="State"
											className="p-3 border rounded-lg"
										/>
										<input
											name="ZIP_code"
											type="text"
											placeholder="ZIP code"
											className="p-3 border rounded-lg"
										/>
									</div>
								</div>
							</section>

							{/* <!-- Book Button --> */}
							<button
								type="submit"
								className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
							>
								Request to book
							</button>
						</div>

						{/* <!-- Right Column --> */}
						<div>
							{/* <!-- Price Details Card --> */}
							<div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
								<div className="flex items-start gap-4 mb-6">
									<Image
										width={200}
										height={200}
										src={BookingHotelData?.thumbNailUrl}
										alt="Property"
										className="w-20 h-20 rounded-lg object-cover"
									/>
									<div>
										<p className="text-sm">{BookingHotelData?.name}</p>
										<div className="flex items-center">
											<i className="fas fa-star text-sm mr-1"></i>
											<span className="text-xs mt-1 text-zinc-500">
												5.00 (3 Reviews)
											</span>
										</div>
									</div>
								</div>

								<div className="border-t pt-4">
									<h3 className="font-semibold mb-4">Price details</h3>
									<div className="space-y-3">
										<div className="flex justify-between">
											<span>
												${BookingHotelData?.pricePerNight} x{" "}
												{DateST?.Nights > 0 ? DateST?.Nights : 0} nights
											</span>
											<span>
												$
												{BookingHotelData?.pricePerNight
													? BookingHotelData?.pricePerNight * DateST?.Nights
													: 0}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Cleaning fee</span>
											<span>${CleaningFee}</span>
										</div>
										<div className="flex justify-between">
											<span>Service fee</span>
											<span>${ServiceFee}</span>
										</div>
										<div className="flex justify-between font-semibold pt-3 border-t">
											<span>Total (USD)</span>
											<span>${Total || 0}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
