"use server";
import connectMongo from "@/dbConnect/connectDB";
import User, { BookData, BookHotels, Data, Hotels } from "../models/user";

export default async function submitForm(e) {
	const formData = {
		name: e.get("Fname"),
		email: e.get("email"),
		password: e.get("password"),
	};
	try {
		await connectMongo();
		await new User(formData).save();
		return { status: 201, message: "User created successfully!" };
	} catch (error) {
		return { status: 500, error: "Same email was registered before" };
	}
}

export async function getData() {
	try {
		await connectMongo();
		const res = await Data.find();

		const HotelList = res.map((doc) => ({
			...doc.toObject(),
			_id: doc._id.toString(),
		}));

		return { status: 200, message: "Data fetched successfully!", HotelList };
	} catch (error) {
		return { status: 500, error: "Data not found" };
	}
}

//update data from create-hotel [start]

const CreateNewHotel = async (CreateHotelData, amenitiesData, userdata) => {
	console.log(CreateHotelData);
	await connectMongo();
	const newHotel = {
		name: CreateHotelData.get("PropertyName") || "Default Name",
		owner: userdata.name || "Default Owner",
		email: userdata.email || "",
		location: CreateHotelData.get("Location") || "Unknown Location",
		description: CreateHotelData.get("textArea") || "No description provided",
		pricePerNight: CreateHotelData.get("Price") || 0,
		thumbNailUrl: CreateHotelData.get("thambnail") || "",
		gallery: [
			CreateHotelData.get("imgOne") || "",
			CreateHotelData.get("imgTwo") || "",
			CreateHotelData.get("imgThree") || "",
			CreateHotelData.get("imgFour") || "",
		],
		amenities: amenitiesData || [],
		availableRooms: CreateHotelData.get("AvailableRooms") || 0,
		totalRooms: CreateHotelData.get("AvailableBedrooms") || 0,
		totalBeds: CreateHotelData.get("AvailableBeds") || 0,
		totalGuests: CreateHotelData.get("GuestSpace") || 0,
	};

	try {
		await new Hotels(newHotel).save();

		console.log("Hotel saved successfully!");

		return { message: "Uploaded" };
	} catch (err) {
		console.error("Error saving hotel:", err);
	}
};

export { CreateNewHotel };

//update data from create-hotel [end]

//Delete data from the data [start]

export async function DeleteHandler(Req_id) {
	try {
		await connectMongo();
		await Data.findByIdAndDelete(Req_id);

		return { message: "Data deleted successfully!" };
	} catch (error) {
		console.log(error);
	}
}

//Delete data from the data [end]

//Edit data from the data [start]
const EditHotel = async (hotelId, CreateHotelData, amenitiesData, userdata) => {
	await connectMongo();

	// Prepare the updated hotel data
	const updatedHotel = {
		name: CreateHotelData.get("PropertyName") || "Default Name",
		owner: userdata.name || "Default Owner",
		email: userdata.email || "",
		location: CreateHotelData.get("Location") || "Unknown Location",
		description: CreateHotelData.get("textArea") || "No description provided",
		pricePerNight: CreateHotelData.get("Price") || 0,
		thumbNailUrl: CreateHotelData.get("thambnail") || "",
		gallery: [
			CreateHotelData.get("imgOne") || "",
			CreateHotelData.get("imgTwo") || "",
			CreateHotelData.get("imgThree") || "",
			CreateHotelData.get("imgFour") || "",
		],
		amenities: amenitiesData || [],
		availableRooms: CreateHotelData.get("AvailableRooms") || 0,
		totalRooms: CreateHotelData.get("AvailableBedrooms") || 0,
		totalBeds: CreateHotelData.get("AvailableBeds") || 0,
		totalGuests: CreateHotelData.get("GuestSpace") || 0,
	};

	try {
		// Find the hotel by its ID and update it with the new data
		const hotel = await Hotels.findByIdAndUpdate(hotelId, updatedHotel, {
			new: true,
		});

		if (!hotel) {
			throw new Error("Hotel not found");
		}

		console.log("Hotel updated successfully!");
		return { message: "Updated" };
	} catch (err) {
		console.error("Error updating hotel:", err);
		return { message: "Error", error: err };
	}
};

export { EditHotel };

//Edit data from the data [end]

//Boocking data [start]
const Boocking = async (
	hotelId,
	BookIngData,
	userdata,
	BookingHotelData,
	DateST,
	Total,
	ServiceFee,
	CleaningFee,
	guests,
	review
) => {
	await connectMongo();
	const BOOKED = {
		thumbNailUrl: BookingHotelData?.thumbNailUrl,
		name: userdata?.name.toString(),
		email: userdata?.email.toString(),
		id: hotelId,
		Hotel_Name: BookingHotelData.name,
		review: review || 0, // Convert review to a number (default 0 if not a valid number)
		Night: DateST?.Nights || 0, // Ensure `Night` is a valid number
		pricePerNight: BookingHotelData?.pricePerNight || "0", // Ensure pricePerNight is a string
		check_In_Date: DateST?.check_In_Date || "", // Default empty string if missing
		check_Out_Date: DateST?.check_Out_Date || "", // Default empty string if missing
		Total: Total || 0, // Ensure `Total` is a number
		ServiceFee: ServiceFee || 0, // Default to 0 if not provided
		CleaningFee: CleaningFee || 0, // Default to 0 if not provided
		guests: guests || 1, // Ensure `guests` is a valid number
		Card_Number: BookIngData.get("Card_Number") || "", // Ensure it's a string
		Expiration: BookIngData.get("Expiration") || "", // Ensure it's a string
		CVV: BookIngData.get("CVV") || "", // Ensure it's a string
		Street_address: BookIngData.get("Street_address") || "", // Default empty string
		Apt_or_suite_number: BookIngData.get("Apt_or_suite_number") || "", // Default empty string
		City: BookIngData.get("City") || "", // Default empty string
		State: BookIngData.get("State") || "", // Default empty string
		ZIP_code: BookIngData.get("ZIP_code") || "", // Default empty string
	};

	// Send the data to MongoDB
	try {
		await new BookHotels(BOOKED).save();
		console.log("Hotel updated successfully!");
		return { message: "successfully", response: BOOKED };
	} catch (err) {
		console.error("Error updating hotel:", err);
		return { message: err };
	}
};

export { Boocking };

//booking data [end]

//uset for finding booking data by maching user name and email [start]

export async function getBookingData() {
	try {
		await connectMongo();
		const res = await BookData.find();

		const BookingList = res.map((doc) => ({
			...doc.toObject(),
			_id: doc._id.toString(),
		}));

		return { status: 200, message: "Data fetched successfully!", BookingList };
	} catch (error) {
		return { status: 500, error: "Data not found" };
	}
}

//uset for finding booking data by maching user name and email [end]
