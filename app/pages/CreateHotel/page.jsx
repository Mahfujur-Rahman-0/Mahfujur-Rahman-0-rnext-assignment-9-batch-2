"use client";

import { CreateNewHotel, EditHotel } from "@/app/api/formhandeler";
import UseContextApi from "@/app/Context/Context";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateHotel() {
	const { user, EditData, setEditData } = UseContextApi();
	const NextPath = useRouter();

	const [loaderr, setLoaderr] = useState(false);
	const [urlImg, setUrlImg] = useState({
		thambnail: EditData !== null ? EditData.thumbNailUrl : "",
		imgOne: EditData !== null ? EditData.gallery[0] : "",
		imgTwo: EditData !== null ? EditData.gallery[1] : "",
		imgThree: EditData !== null ? EditData.gallery[2] : "",
		imgFour: EditData !== null ? EditData.gallery[3] : "",
	});
	const [toggoler, setToggoler] = useState({
		PropertyName: false,
		Location: false,
		Price: false,
		AvailableRooms: false,
		GuestSpace: false,
		AvailableBedrooms: false,
		AvailableBeds: false,
		textArea: EditData !== null && EditData.description !== "" ? true : false,
	});
	const [TempData, setTempData] = useState({
		PropertyName: EditData !== null ? EditData.name : "",
		Location: EditData !== null ? EditData.location : "",
		Price: EditData !== null ? EditData.pricePerNight : "",
		AvailableRooms: EditData !== null ? EditData.availableRooms : "",
		GuestSpace: EditData !== null ? EditData.totalGuests : "",
		AvailableBedrooms: EditData !== null ? EditData.totalRooms : "",
		AvailableBeds: EditData !== null ? EditData.totalBeds : "",
		textArea: EditData !== null ? EditData.description : "",
	});
	const [Amenities, setAmenities] = useState({
		BeachAccess:
			EditData !== null && EditData.amenities[0] !== ""
				? EditData.amenities[0]
				: "",
		FreeWiFi:
			EditData !== null && EditData.amenities[0] !== ""
				? EditData.amenities[1]
				: "",
		FreeParking:
			EditData !== null && EditData.amenities[0] !== ""
				? EditData.amenities[2]
				: "",
		PrivatePool:
			EditData !== null && EditData.amenities[0] !== ""
				? EditData.amenities[3]
				: "",
		Kitchen:
			EditData !== null && EditData.amenities[0] !== ""
				? EditData.amenities[4]
				: "",
		FitnessCenter:
			EditData !== null && EditData.amenities[0] !== ""
				? EditData.amenities[5]
				: "",
	});
	const amenities = [
		Amenities.BeachAccess,
		Amenities.FreeWiFi,
		Amenities.FreeParking,
		Amenities.PrivatePool,
		Amenities.Kitchen,
		Amenities.FitnessCenter,
	];

	async function handelSubmitCreateHotel(CreateHotelData) {
		if (EditData === null) {
			try {
				await CreateNewHotel(CreateHotelData, amenities, user);
				NextPath.push("/");
			} catch (err) {}
		} else {
			try {
				await EditHotel(EditData._id, CreateHotelData, amenities, user);
				setEditData(null);
				NextPath.push("/pages/ManageHotels");
			} catch (err) {}
		}
	}
	function Loader() {
		setLoaderr(true);
	}

	return (
		<>
			{loaderr == true && (
				<div className="fixed top-0 z-50 translate_bg w-full h-full">
					<div className="loader mx-auto mt-[50vh]">
						<div className="progress" data-percentage="100%"></div>
					</div>
				</div>
			)}

			<form action={handelSubmitCreateHotel} className="bg-gray-50 ">
				{/* <!-- Property Details Container --> */}
				<div className="max-w-7xl mx-auto px-6 py-8 relative">
					<button
						onClick={Loader}
						type="submit"
						className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 absolute top-4 right-4"
					>
						<i className="fas fa-save mr-2"></i>
						{EditData !== null ? "Save" : "Publish"}
					</button>
					{/* <!-- Property Title and Rating --> */}
					<div className="mb-6">
						<div className="mb-4 flex justify-start">
							<input
								name="PropertyName"
								value={TempData.PropertyName}
								onChange={(e) =>
									setTempData((prevState) => ({
										...prevState,
										PropertyName: e.target.value,
									}))
								}
								type="text"
								id="Property"
								className={`${
									!toggoler.PropertyName && "hidden"
								} text-zinc-800 font-bold text-3xl outline-primary`}
							/>{" "}
							<button
								type="button"
								onClick={() =>
									setToggoler((prevState) => ({
										...prevState,
										PropertyName: !true,
									}))
								}
								className={`${
									!toggoler.PropertyName && "hidden"
								} px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90`}
							>
								<i className="fas fa-save mr-2"></i> Save
							</button>
							<h1
								className={`${
									toggoler.PropertyName && "hidden"
								} text-3xl font-bold mb-2 text-zinc-400 edit`}
							>
								{TempData.PropertyName
									? TempData.PropertyName
									: "Property Name"}
								<label
									onClick={() =>
										setToggoler((prevState) => ({
											...prevState,
											PropertyName: true,
										}))
									}
									htmlFor="Property"
								>
									<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
								</label>
							</h1>
						</div>

						<div className="flex justify-start items-center text-gray-600">
							<input
								name="Location"
								value={TempData.Location}
								onChange={(e) =>
									setTempData((prevState) => ({
										...prevState,
										Location: e.target.value,
									}))
								}
								type="text"
								id="Location"
								className={`${
									!toggoler.Location && "hidden"
								} text-zinc-800 font-bold text-3xl outline-primary`}
							/>{" "}
							<button
								type="button"
								onClick={() =>
									setToggoler((prevState) => ({
										...prevState,
										Location: !true,
									}))
								}
								className={`${
									!toggoler.Location && "hidden"
								} px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90`}
							>
								<i className="fas fa-save mr-2"></i> Save
							</button>
							<span
								className={`${
									toggoler.Location && "hidden"
								} edit text-gray-600`}
							>
								{TempData.Location ? TempData.Location : "Property location"}{" "}
								<label
									onClick={() =>
										setToggoler((prevState) => ({
											...prevState,
											Location: true,
										}))
									}
									htmlFor="Location"
								>
									<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
								</label>
							</span>
						</div>
					</div>

					{/* <!-- Image Gallery --> */}
					<div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
						<div className="col-span-2 row-span-2 relative">
							<Image
								width={600}
								height={400}
								src={`${
									urlImg.thambnail.replace(/\s+/g, "")
										? urlImg.thambnail
										: "https://placehold.co/600x400"
								}`}
								alt="Main Room"
								className="w-full h-full object-cover rounded-lg"
							/>
							<div className="row w-full flex absolute bottom-2">
								{/* use for upload img start */}

								<input
									disabled
									className=" w-0 h-0 inset-0 opacity-0 cursor-pointer"
									type="file"
									id="Thambnail"
									accept="image/*"
								/>

								<label
									disabled
									style={{ cursor: "not-allowed", backgroundColor: "#f0f0f0" }}
									htmlFor="Thambnail"
									className="w-1/2 border rounded-lg ml-4 mr-2 border-primary px-4 py-3 bg-white text-center text-gray-600 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
								>
									Choose Profile Pic <i className="fa-solid fa-file-import"></i>
								</label>

								{/* use for upload img end */}

								<input
									name="thambnail"
									value={urlImg.thambnail}
									onChange={(e) =>
										setUrlImg((prevState) => ({
											...prevState,
											thambnail: e.target.value,
										}))
									}
									type="text"
									placeholder="https://placehold.co/600x400"
									className="w-1/2 mr-4 ml-2 p-2 pl-3 border border-primary rounded-lg  bg-white "
								/>
							</div>
						</div>

						<div className="relative">
							<Image
								width={600}
								height={400}
								src={`${
									urlImg.imgOne.replace(/\s+/g, "")
										? urlImg.imgOne
										: "https://placehold.co/600x400"
								}`}
								alt="Room 1"
								className="w-full h-full object-cover rounded-lg"
							/>
							<div className="row w-full flex absolute bottom-2">
								{/* use for upload img start */}
								<input
									className=" w-0 h-0 inset-0 opacity-0 cursor-pointer"
									type="file"
									id="imgOne"
									accept="image/*"
									disabled
								/>

								<label
									disabled
									style={{ cursor: "not-allowed", backgroundColor: "#f0f0f0" }}
									htmlFor="imgOne"
									className=" w-1/2 select-none border rounded-lg mr-1 ml-2 border-primary px-4 py-3 bg-white text-center text-gray-600 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
								>
									Image <i className="fa-solid fa-file-import"></i>
								</label>
								{/* use for upload img end */}
								<input
									name="imgOne"
									value={urlImg.imgOne}
									onChange={(e) =>
										setUrlImg((prevState) => ({
											...prevState,
											imgOne: e.target.value,
										}))
									}
									type="text"
									placeholder="https://placehold.co/600x400"
									className="w-1/2 mr-2 ml-1 p-2 border border-primary rounded-lg  bg-white "
								/>
							</div>
						</div>
						<div className="relative">
							<Image
								width={600}
								height={400}
								src={`${
									urlImg.imgTwo.replace(/\s+/g, "")
										? urlImg.imgTwo
										: "https://placehold.co/600x400"
								}`}
								alt="Room 2"
								className="w-full h-full object-cover rounded-lg"
							/>
							<div className="row w-full flex absolute bottom-2">
								{/* use for upload img start */}
								<input
									disabled
									className=" w-0 h-0 inset-0 opacity-0 cursor-pointer"
									type="file"
									id="imgTwo"
									accept="image/*"
								/>

								<label
									disabled
									style={{ cursor: "not-allowed", backgroundColor: "#f0f0f0" }}
									htmlFor="imgTwo"
									className="w-1/2 select-none border rounded-lg mr-1 ml-2 border-primary px-4 py-3 bg-white text-center text-gray-600 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
								>
									Image <i className="fa-solid fa-file-import"></i>
								</label>
								{/* use for upload img end */}
								<input
									name="imgTwo"
									value={urlImg.imgTwo}
									onChange={(e) =>
										setUrlImg((prevState) => ({
											...prevState,
											imgTwo: e.target.value,
										}))
									}
									type="text"
									placeholder="https://placehold.co/600x400"
									className="w-1/2 mr-2 ml-1 p-2 border border-primary rounded-lg  bg-white "
								/>
							</div>
						</div>
						<div className="relative">
							<Image
								width={600}
								height={400}
								src={`${
									urlImg.imgThree.replace(/\s+/g, "")
										? urlImg.imgThree
										: "https://placehold.co/600x400"
								}`}
								alt="Room 3"
								className="w-full h-full object-cover rounded-lg"
							/>
							<div className="row w-full flex absolute bottom-2">
								{/* use for upload img start */}
								<input
									disabled
									className=" w-0 h-0 inset-0 opacity-0 cursor-pointer"
									type="file"
									id="imgThree"
									accept="image/*"
								/>

								<label
									disabled
									style={{ cursor: "not-allowed", backgroundColor: "#f0f0f0" }}
									htmlFor="imgThree"
									className="w-1/2 select-none border rounded-lg mr-1 ml-2 border-primary px-4 py-3 bg-white text-center text-gray-600 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
								>
									Image <i className="fa-solid fa-file-import"></i>
								</label>
								{/* use for upload img end */}
								<input
									name="imgThree"
									value={urlImg.imgThree}
									onChange={(e) =>
										setUrlImg((prevState) => ({
											...prevState,
											imgThree: e.target.value,
										}))
									}
									type="text"
									placeholder="https://placehold.co/600x400"
									className="w-1/2 mr-2 ml-1 p-2 border border-primary rounded-lg  bg-white "
								/>
							</div>
						</div>
						<div className="relative">
							<Image
								width={600}
								height={400}
								src={`${
									urlImg.imgFour.replace(/\s+/g, "")
										? urlImg.imgFour
										: "https://placehold.co/600x400"
								}`}
								alt="Room 4"
								className="w-full h-full object-cover rounded-lg"
							/>
							<div className="row w-full flex absolute bottom-2">
								{" "}
								{/* use for upload img start */}
								<input
									disabled
									className=" w-0 h-0 inset-0 opacity-0 cursor-pointer"
									type="file"
									id="imgFour"
									accept="image/*"
								/>
								<label
									disabled
									style={{ cursor: "not-allowed", backgroundColor: "#f0f0f0" }}
									htmlFor="imgFour"
									className="w-1/2 select-none border rounded-lg mr-1 ml-2 border-primary px-4 py-3 bg-white text-center text-gray-600 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
								>
									Image <i className="fa-solid fa-file-import"></i>
								</label>{" "}
								{/* use for upload img end */}
								<input
									name="imgFour"
									value={urlImg.imgFour}
									onChange={(e) =>
										setUrlImg((prevState) => ({
											...prevState,
											imgFour: e.target.value,
										}))
									}
									type="text"
									placeholder="https://placehold.co/600x400"
									className="w-1/2 mr-2 ml-1 p-2 border border-primary rounded-lg  bg-white "
								/>
							</div>
						</div>
					</div>

					<div className="mb-4 flex justify-start">
						<input
							name="Price"
							value={TempData.Price}
							onChange={(e) =>
								setTempData((prevState) => ({
									...prevState,
									Price: e.target.value,
								}))
							}
							type="number"
							id="Price"
							className={`${
								!toggoler.Price && "hidden"
							} text-zinc-800 font-bold text-3xl outline-primary w-32`}
						/>{" "}
						<button
							type="button"
							onClick={() =>
								setToggoler((prevState) => ({
									...prevState,
									Price: !true,
								}))
							}
							className={`${
								!toggoler.Price && "hidden"
							} px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90`}
						>
							<i className="fas fa-save mr-2"></i> Save
						</button>
						<span
							className={`${
								toggoler.Price && "hidden"
							} text-xl font-bold edit text-zinc-500 `}
						>
							{TempData.Price ? TempData.Price + " " + "$" : "Price in USD"}
							<label
								onClick={() =>
									setToggoler((prevState) => ({
										...prevState,
										Price: true,
									}))
								}
								htmlFor="Price"
							>
								<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
							</label>
						</span>
						<span className="text-gray-600 my-auto ml-1">Per night</span>
					</div>

					<div className="mb-4 flex justify-start text-zinc-500">
						<input
							name="AvailableRooms"
							value={TempData.AvailableRooms}
							onChange={(e) =>
								setTempData((prevState) => ({
									...prevState,
									AvailableRooms: e.target.value,
								}))
							}
							type="number"
							id="AvailableRooms"
							className={`${
								!toggoler.AvailableRooms && "hidden"
							} text-zinc-800 font-bold text-3xl outline-primary w-32`}
						/>{" "}
						<button
							type="button"
							onClick={() =>
								setToggoler((prevState) => ({
									...prevState,
									AvailableRooms: !true,
								}))
							}
							className={`${
								!toggoler.AvailableRooms && "hidden"
							} px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90`}
						>
							<i className="fas fa-save mr-2"></i> Save
						</button>
						{/* <!-- Stock --> */}
						<span className={`${toggoler.AvailableRooms && "hidden"}`}>
							{TempData.AvailableRooms
								? TempData.AvailableRooms + " " + "Rooms" + " " + "$"
								: " Available X rooms"}
							<label
								onClick={() =>
									setToggoler((prevState) => ({
										...prevState,
										AvailableRooms: true,
									}))
								}
								htmlFor="AvailableRooms"
							>
								<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
							</label>
						</span>
					</div>

					{/* <!-- Property Details --> */}
					<div className="grid grid-cols-3 gap-8">
						{/* <!-- Left Column: Property Description --> */}
						<div className="col-span-2">
							<div className="border-b pb-6 mb-6">
								<div className="grid grid-cols-1 gap-4 text-gray-600">
									<div className="flex justify-start items-center gap-2">
										<i className="fas fa-person"></i>
										<input
											name="GuestSpace"
											value={TempData.GuestSpace}
											onChange={(e) =>
												setTempData((prevState) => ({
													...prevState,
													GuestSpace: e.target.value,
												}))
											}
											type="number"
											id="GuestSpace"
											className={`${
												!toggoler.GuestSpace && "hidden"
											} text-zinc-800 font-bold text-3xl outline-primary w-32`}
										/>{" "}
										<button
											type="button"
											onClick={() =>
												setToggoler((prevState) => ({
													...prevState,
													GuestSpace: !true,
												}))
											}
											className={`${
												!toggoler.GuestSpace && "hidden"
											} px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90`}
										>
											<i className="fas fa-save mr-2"></i> Save
										</button>
										<span className={`${toggoler.GuestSpace && "hidden"}`}>
											{TempData.GuestSpace
												? TempData.GuestSpace + " " + "Guest" + " "
												: "How many Guest can Stay?"}
										</span>{" "}
										<label
											className={`${toggoler.GuestSpace && "hidden"}`}
											onClick={() =>
												setToggoler((prevState) => ({
													...prevState,
													GuestSpace: true,
												}))
											}
											htmlFor="GuestSpace"
										>
											<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
										</label>
									</div>

									<div className="flex justify-start items-center gap-2">
										<i className="fas fa-door-open"></i>
										<input
											name="AvailableBedrooms"
											value={TempData.AvailableBedrooms}
											onChange={(e) =>
												setTempData((prevState) => ({
													...prevState,
													AvailableBedrooms: e.target.value,
												}))
											}
											type="number"
											id="AvailableBedrooms"
											className={`${
												!toggoler.AvailableBedrooms && "hidden"
											} text-zinc-800 font-bold text-3xl outline-primary w-32`}
										/>{" "}
										<button
											type="button"
											onClick={() =>
												setToggoler((prevState) => ({
													...prevState,
													AvailableBedrooms: !true,
												}))
											}
											className={`${
												!toggoler.AvailableBedrooms && "hidden"
											} px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90`}
										>
											<i className="fas fa-save mr-2"></i> Save
										</button>
										<span
											className={`${toggoler.AvailableBedrooms && "hidden"}`}
										>
											{TempData.AvailableBedrooms
												? TempData.AvailableBedrooms + " " + "Bedrooms" + " "
												: "How many Bedrooms ?"}
										</span>{" "}
										<label
											className={`${toggoler.AvailableBedrooms && "hidden"}`}
											onClick={() =>
												setToggoler((prevState) => ({
													...prevState,
													AvailableBedrooms: true,
												}))
											}
											htmlFor="AvailableBedrooms"
										>
											<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
										</label>
									</div>

									<div className="flex justify-start items-center gap-2">
										<i className="fas fa-bed"></i>
										<input
											name="AvailableBeds"
											value={TempData.AvailableBeds}
											onChange={(e) =>
												setTempData((prevState) => ({
													...prevState,
													AvailableBeds: e.target.value,
												}))
											}
											type="number"
											id="AvailableBeds"
											className={`${
												!toggoler.AvailableBeds && "hidden"
											} text-zinc-800 font-bold text-3xl outline-primary w-32`}
										/>{" "}
										<button
											type="button"
											onClick={() =>
												setToggoler((prevState) => ({
													...prevState,
													AvailableBeds: !true,
												}))
											}
											className={`${
												!toggoler.AvailableBeds && "hidden"
											} px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90`}
										>
											<i className="fas fa-save mr-2"></i> Save
										</button>
										<span className={`${toggoler.AvailableBeds && "hidden"}`}>
											{TempData.AvailableBeds
												? TempData.AvailableBeds + " " + "Guest" + " "
												: "How many beds available ?"}
										</span>{" "}
										<label
											className={`${toggoler.AvailableBeds && "hidden"}`}
											onClick={() =>
												setToggoler((prevState) => ({
													...prevState,
													AvailableBeds: true,
												}))
											}
											htmlFor="AvailableBeds"
										>
											<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
										</label>
									</div>
								</div>
							</div>

							{/* <!-- Description --> */}
							<div className="mb-6">
								<h3 className="text-xl font-semibold mb-4">About this place</h3>
								<textarea
									value={TempData.textArea}
									onChange={(e) =>
										setTempData((prevState) => ({
											...prevState,
											textArea: e.target.value,
										}))
									}
									name="textArea"
									id="AboutThisPlace"
									className={`${
										!toggoler.textArea && "hidden"
									} w-96 h-40 border border-gray-300 rounded-md p-2 resize-none`}
									placeholder="Write something about this place..."
								></textarea>

								<p
									className={`${
										toggoler.textArea && "hidden"
									} text-gray-700 leading-relaxed edit`}
								>
									Write a short description about this place{" "}
									<label
										onClick={() =>
											setToggoler((prevState) => ({
												...prevState,
												textArea: true,
											}))
										}
										htmlFor="AboutThisPlace"
									>
										<i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
									</label>
								</p>
							</div>

							{/* <!-- Amenities --> */}
							<div className=" select-none">
								<h3 className="text-xl font-semibold mb-4">
									What this place offers
								</h3>
								<div className="grid grid-cols-2 gap-4" id="amenities">
									<div className="flex items-center gap-2 cursor-pointer">
										<i className="fa-solid fa-umbrella-beach"></i>
										<span
											onClick={() =>
												setAmenities((e) => ({
													...e,

													BeachAccess:
														Amenities.BeachAccess == "" ? "Beach access" : "",
												}))
											}
										>
											Beach access{" "}
											{Amenities.BeachAccess != "" && (
												<i className="fas fa-check text-green-500"></i>
											)}
										</span>
									</div>
									<div className="flex items-center gap-2 cursor-pointer">
										<i className="fa-solid fa-person-swimming"></i>
										<span
											onClick={() =>
												setAmenities((e) => ({
													...e,

													PrivatePool:
														Amenities.PrivatePool == "" ? "Private pool" : "",
												}))
											}
										>
											Private pool{" "}
											{Amenities.PrivatePool != "" && (
												<i className="fas fa-check text-green-500"></i>
											)}
										</span>
									</div>
									<div className="flex items-center gap-2 cursor-pointer">
										<i className="fa-solid fa-wifi"></i>
										<span
											onClick={() =>
												setAmenities((e) => ({
													...e,
													FreeWiFi:
														Amenities.FreeWiFi == "" ? "Free Wi-Fi" : "",
												}))
											}
										>
											Free Wi-Fi{" "}
											{Amenities.FreeWiFi != "" && (
												<i className="fas fa-check text-green-500"></i>
											)}
										</span>
									</div>
									<div className="flex items-center gap-2 cursor-pointer">
										<i className="fa-solid fa-sink"></i>
										<span
											onClick={() =>
												setAmenities((e) => ({
													...e,
													Kitchen: Amenities.Kitchen == "" ? "Kitchen" : "",
												}))
											}
										>
											Kitchen{" "}
											{Amenities.Kitchen != "" && (
												<i className="fas fa-check text-green-500"></i>
											)}
										</span>
									</div>

									<div className="flex items-center gap-2 cursor-pointer">
										<i className="fa-solid fa-square-parking"></i>
										<span
											onClick={() =>
												setAmenities((e) => ({
													...e,
													FreeParking:
														Amenities.FreeParking == "" ? "Free Parking" : "",
												}))
											}
										>
											Free Parking{" "}
											{Amenities.FreeParking != "" && (
												<i className="fas fa-check text-green-500"></i>
											)}
										</span>
									</div>

									<div className="flex items-center gap-2 cursor-pointer">
										<i className="fa-solid fa-dumbbell"></i>
										<span
											onClick={() =>
												setAmenities((e) => ({
													...e,
													FitnessCenter:
														Amenities.FitnessCenter == ""
															? "Fitness Center"
															: "",
												}))
											}
										>
											Fitness Center{" "}
											{Amenities.FitnessCenter != "" && (
												<i className="fas fa-check text-green-500"></i>
											)}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* <!-- Right Column: Booking Card --> */}
					</div>
				</div>
			</form>
		</>
	);
}
