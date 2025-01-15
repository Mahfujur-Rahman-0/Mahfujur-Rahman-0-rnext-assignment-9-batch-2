"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseContextApi from "../Context/Context";

export default function ReservationCard({ HotelReserveData }) {
	const [checkInDate, setCheckInDate] = useState(null);
	const [checkOutDate, setCheckOutDate] = useState(null);
	const [DateST, setDateST] = useState({
		check_In_Date: "",
		check_Out_Date: "",
		Nights: "",
	});
	const router = useRouter();
	const [guests, setGuests] = useState(1);
	const { ReserveData, setReserveData, setBookingHotelData } = UseContextApi();

	async function HandelReserve() {
		await setReserveData({
			CheckinDate: checkInDate,
			CheckOutDate: checkOutDate,
			GuestNum: guests,
			Nights: DateST.Nights,
		});
		await setBookingHotelData(HotelReserveData);
		ReserveData && router.push("/pages/PaymentProcess");
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
	console.log(DateST);
	return (
		<div>
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
								className={`p-3 w-full ${!checkInDate ? "border-red-500" : ""}`}
								disabled={checkInDate == "" && true}
							/>
						</div>
					</div>
					<input
						type="number"
						placeholder="Guests"
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						className="w-full p-3"
						min={1}
					/>
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
				<button
					onClick={() => {
						if (!checkInDate || !checkOutDate) {
							if (!checkInDate) {
								setCheckInDate("");
							} else if (!checkOutDate) {
								setCheckOutDate("");
							}
						} else {
							HandelReserve();
						}
					}}
					className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
				>
					Reserve
				</button>

				{/* Note Section */}
				<div className="text-center mt-4 text-gray-600">
					<p>You{" won't "}be charged yet</p>
				</div>
			</div>
		</div>
	);
}
