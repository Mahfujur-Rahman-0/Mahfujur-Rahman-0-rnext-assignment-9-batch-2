"use client";

import { createContext, useContext, useState } from "react";

const myContext = createContext();

export function ContextProvider({ children }) {
	const [data, setData] = useState({ Hotels: [], error: null, loading: true });
	const [user, setUser] = useState();
	const [EditData, setEditData] = useState(null);
	const [BookingHotelData, setBookingHotelData] = useState(null);
	const [ReserveData, setReserveData] = useState({
		CheckinDate: "",
		CheckOutDate: "",
		GuestNum: 1,
	});

	return (
		<myContext.Provider
			value={{
				data,
				setData,
				user,
				setUser,
				EditData,
				setEditData,
				ReserveData,
				setReserveData,
				BookingHotelData,
				setBookingHotelData,
			}}
		>
			{children}
		</myContext.Provider>
	);
}
export default function UseContextApi() {
	return useContext(myContext);
}
