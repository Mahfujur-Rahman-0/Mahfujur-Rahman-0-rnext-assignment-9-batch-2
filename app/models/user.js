import mongoose from "mongoose";

//[Note: before useing mongoose always install mongoose]
//Used for createing new account [start]

const UsersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		match: [
			/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
			"Please enter a valid email address",
		],
	},
	password: {
		type: String,

		minlength: 6,
	},
});

const User =
	mongoose?.models?.User || mongoose.model("User", UsersSchema, "users");
export default User;
//Used for createing new account [End]

//Used for getting new data from data-base to render at the home screen [start]
const dataSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		value: { type: Number, required: true },
	},
	{
		collection: "data",
	}
);

const Data = mongoose.models.Data || mongoose.model("Data", dataSchema);

export { Data };

//Used for getting new data from data-base to render at the home screen [End]

//Used for Login to a account [Start]

const LogInSchema = new mongoose.Schema(
	{
		name: { type: String, required: false },
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email address",
			],
		},
		password: {
			type: String,
			minlength: 6,
		},
	},
	{
		collection: "users",
	}
);

const OldUser =
	mongoose?.models?.OldUser || mongoose.model("OldUser", LogInSchema);
export { OldUser };

//Used for Login to a account [End]

//Used for createing new Hotels [start]
const HotelsSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	owner: {
		type: String,
	},
	email: {
		type: String,
	},
	location: {
		type: String,
	},
	description: {
		type: String,
	},
	pricePerNight: {
		type: Number,
	},
	thumbNailUrl: {
		type: String,
	},
	gallery: {
		type: [String],
	},
	amenities: {
		type: [String],
	},
	availableRooms: {
		type: Number,
	},
	totalRooms: {
		type: Number,
	},
	totalBeds: {
		type: Number,
	},
	totalGuests: {
		type: Number,
	},
});

const Hotels =
	mongoose?.models?.Hotels || mongoose.model("Hotels", HotelsSchema, "data");
export { Hotels };

//Used for createing new Hotels [End]

//Used for Edit Hotels data [start]

const EditedHotels =
	mongoose?.models?.EditedHotels ||
	mongoose.model("EditedHotels", HotelsSchema, "data");
export { EditedHotels };

//Used for Edit Hotels data [end]

//Used for Booking [start]

const BookHotelsSchema = new mongoose.Schema({
	thumbNailUrl: { type: mongoose.Schema.Types.Mixed },
	name: { type: mongoose.Schema.Types.Mixed },
	email: {
		type: mongoose.Schema.Types.Mixed,
		trim: true,
		match: [
			/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
			"Please enter a valid email address",
		],
	},
	id: { type: String },
	Hotel_Name: { type: String },
	review: { type: mongoose.Schema.Types.Mixed }, // Allow review to be either a string or number
	Night: { type: Number },
	pricePerNight: { type: String },
	check_In_Date: { type: String },
	check_Out_Date: { type: String },
	Total: { type: Number },
	ServiceFee: { type: Number },
	CleaningFee: { type: Number },
	guests: { type: Number },
	Card_Number: { type: String },
	Expiration: { type: String },
	CVV: { type: String },
	Street_address: { type: String },
	Apt_or_suite_number: { type: String },
	City: { type: String },
	State: { type: String },
	ZIP_code: { type: String },
});
const BookHotels =
	mongoose?.models?.BookHotels ||
	mongoose.model("BookHotels", BookHotelsSchema, "booking");

export { BookHotels };

//Used for Booking [end]

//Used for getting new data from data-base to render at the home screen [start]
const BOOKED_LIST = new mongoose.Schema(
	{
		name: { type: String, required: true },
		value: { type: Number, required: true },
	},
	{
		collection: "booking",
	}
);

const BookData =
	mongoose.models.BookData || mongoose.model("BookData", BOOKED_LIST);

export { BookData };

//Used for getting new data from data-base to render at the home screen [End]
