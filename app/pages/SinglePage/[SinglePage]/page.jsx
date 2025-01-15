import { getData } from "@/app/api/formhandeler";
import ReservationCard from "@/app/components/DatePicker";
import ReviewModal from "@/app/components/ReviewModal";
import Image from "next/image";

export default async function SinglePage({ params }) {
	const Id = params.SinglePage;

	const result = await getData();
	const singleData = result?.HotelList?.find((e) => e._id === Id);

	return (
		<div className="bg-gray-50 ">
			{/* <!-- Property Details Container --> */}
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* <!-- Property Title and Rating --> */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold mb-2">{singleData?.name}</h1>
					<div className="flex items-center text-gray-600">
						<i className="fas fa-star text-yellow-500 mr-1"></i>
						<span>{singleData?.rating} · </span>
						<span className="ml-2">2 reviews</span>
						<span className="mx-2">·</span>
						<span className="">{singleData?.location}</span>
					</div>
				</div>

				{/* <!-- Image Gallery --> */}
				<div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
					<div className="col-span-2 row-span-2">
						<Image
							width={610}
							height={500}
							src={singleData?.thumbNailUrl}
							alt="Main Room"
							className="w-full h-full object-cover rounded-lg"
						/>
					</div>
					{singleData?.gallery?.map(
						(e, i) =>
							e !== "" && (
								<div key={i + "Image"}>
									<Image
										width={300}
										height={250}
										src={e}
										alt="Room 1"
										className="w-full h-full object-cover rounded-lg"
									/>
								</div>
							)
					)}
				</div>

				{/* <!-- Property Details --> */}
				<div className="grid grid-cols-3 gap-8">
					{/* <!-- Left Column: Property Description --> */}
					<div className="col-span-2">
						<div className="border-b pb-6 mb-6">
							<h2 className="text-2xl font-semibold mb-4">
								Entire villa hosted by {singleData?.owner}
							</h2>
							<div className="grid grid-cols-3 gap-4 text-gray-600">
								<div className="flex items-center gap-2">
									<i className="fas fa-person"></i>
									<span>{singleData?.totalGuests} guests</span>
								</div>
								<div className="flex items-center gap-2">
									<i className="fas fa-door-open"></i>
									<span>{singleData?.totalRooms} bedrooms</span>
								</div>
								<div className="flex items-center gap-2">
									<i className="fas fa-bed"></i>
									<span>{singleData?.totalBeds} beds</span>
								</div>
							</div>
						</div>

						{/* <!-- Description --> */}
						<div className="mb-6">
							<h3 className="text-xl font-semibold mb-4">About this place</h3>
							<p className="text-gray-700 leading-relaxed">
								{singleData?.description}
							</p>
						</div>

						{/* <!-- Amenities --> */}
						<div>
							<h3 className="text-xl font-semibold mb-4">
								What this place offers
							</h3>
							<div className="grid grid-cols-2 gap-4">
								{singleData?.amenities.map((e, iin) => (
									<div key={iin + e} className="flex items-center gap-2">
										{e == "Beach access" && (
											<i className="fa-solid fa-umbrella-beach"></i>
										)}
										{e == "Private pool" && (
											<i className="fa-solid fa-person-swimming"></i>
										)}
										{e == "Free Wi-Fi" && <i className="fa-solid fa-wifi"></i>}
										{e == "Kitchen" && <i className="fa-solid fa-sink"></i>}
										{e == "Fitness Center" && (
											<i className="fa-solid fa-heart"></i>
										)}
										{e == "Eiffel Tower View" && (
											<svg
												fill="#000000"
												height="19px"
												width="19px"
												version="1.1"
												id="Capa_1"
												xmlns="http://www.w3.org/2000/svg"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												viewBox="0 0 472 472"
												xmlSpace="preserve"
											>
												<path
													d="M396.625,456h-4.638c-27.449-32.71-51.398-68.051-71.627-105.655c1.859-1.465,3.057-3.731,3.057-6.282c0-4.418-3.582-8-8-8
												 h-2.511c-9.981-19.746-18.961-40.084-26.907-60.966c-0.386-1.015-0.761-2.035-1.142-3.052c4.255-0.184,7.651-3.682,7.651-7.982
												 c0-4.418-3.582-8-8-8H279.1c-20.342-58.98-31.997-120.634-34.743-183.76c4.137-0.308,7.399-3.754,7.399-7.97V40.25
												 c0-4.391-3.539-7.952-7.919-7.996V8c0-4.418-3.582-8-8-8s-8,3.582-8,8v24.254c-4.381,0.044-7.92,3.605-7.92,7.996v24.082
												 c0,4.216,3.263,7.662,7.4,7.97c-2.746,63.126-14.401,124.781-34.743,183.76h-5.406c-4.418,0-8,3.582-8,8
												 c0,4.301,3.396,7.798,7.651,7.982c-0.381,1.017-0.756,2.036-1.142,3.052c-7.946,20.882-16.927,41.22-26.907,60.966h-2.511
												 c-4.418,0-8,3.582-8,8c0,2.551,1.198,4.817,3.057,6.282c-20.23,37.604-44.178,72.945-71.628,105.655h-4.311c-4.418,0-8,3.582-8,8
												 s3.582,8,8,8h8.039h64.361h7.142c4.418,0,8-3.582,8-8c0-3.992-2.927-7.291-6.749-7.893c3.978-40.455,38.187-72.17,79.67-72.17
												 c41.5,0,75.719,31.741,79.674,72.219c-3.665,0.731-6.427,3.964-6.427,7.844c0,4.418,3.582,8,8,8h6.816h64.36h8.365
												 c4.418,0,8-3.582,8-8S401.043,456,396.625,456z M235.837,148.082c5.756,36.743,14.56,72.814,26.362,107.98h-52.724
												 C221.276,220.896,230.081,184.825,235.837,148.082z M200.629,280.787c1.104-2.901,2.183-5.81,3.245-8.724h63.925
												 c1.062,2.914,2.141,5.823,3.245,8.724c7.181,18.873,15.207,37.302,24.013,55.276h-15.115c-7.113-14.064-13.773-28.527-19.813-43.061
												 c-2.045-4.938-6.809-4.938-8.843-4.938l-32.351,0c-3.232,0-6.147,1.945-7.388,4.93c-6.042,14.541-12.701,29.004-19.816,43.07
												 h-15.115C185.423,318.089,193.448,299.659,200.629,280.787z M262.071,336.063h-52.468c5.16-10.524,10.067-21.231,14.647-32
												 c6.331,0,16.845,0,23.173,0C252.003,314.833,256.911,325.539,262.071,336.063z M331.569,456
												 c-4.078-49.241-45.457-88.063-95.732-88.063S144.182,406.759,140.104,456h-39.7c26.026-32.357,48.783-67.116,68.106-103.938h28.289
												 c0.001,0,0.002,0,0.003,0h78.22c0.007,0,0.014,0.001,0.022,0.001c0.008,0,0.017-0.001,0.025-0.001h28.094
												 c19.323,36.822,42.08,71.58,68.106,103.938H331.569z"
												/>
											</svg>
										)}
										{e == "Wine Cellar" && (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 64 64"
												fill="#000"
												width="19px"
												height="19px"
											>
												<path d="M16 2h32v4H16z" /> {/* Top of the cellar */}
												<rect
													x="12"
													y="8"
													width="40"
													height="48"
													rx="4"
													ry="4"
													fill="#A52A2A"
												/>{" "}
												{/* Cellar structure */}
												<circle cx="20" cy="20" r="4" fill="#FFFFFF" />{" "}
												{/* Wine bottle */}
												<circle cx="32" cy="20" r="4" fill="#FFFFFF" />
												<circle cx="44" cy="20" r="4" fill="#FFFFFF" />
												<circle cx="20" cy="32" r="4" fill="#FFFFFF" />
												<circle cx="32" cy="32" r="4" fill="#FFFFFF" />
												<circle cx="44" cy="32" r="4" fill="#FFFFFF" />
												<circle cx="20" cy="44" r="4" fill="#FFFFFF" />
												<circle cx="32" cy="44" r="4" fill="#FFFFFF" />
												<circle cx="44" cy="44" r="4" fill="#FFFFFF" />
											</svg>
										)}
										{e == "Free Parking" && <i className="fa-solid fa-car"></i>}
										{e == "Zen Garden" && <i className="fa-solid fa-tree"></i>}
										{e == "Lake access" && (
											<i className="fa-solid fa-water"></i>
										)}
										{e == "Pet-friendly" && <i className="fa-solid fa-paw"></i>}

										{e == "Hiking trails" && (
											<i className="fa-solid fa-person-hiking"></i>
										)}
										{e == "French Cuisine" && (
											<svg
												version="1.0"
												xmlns="http://www.w3.org/2000/svg"
												width="19px"
												height="19px"
												viewBox="130 40 85 200"
												preserveAspectRatio="xMidYMid meet"
											>
												<g
													transform="translate(0.000000,301.000000) scale(0.100000,-0.100000)"
													fill="#000000"
													stroke="none"
												>
													<path
														d="M827 2323 c-3 -5 -28 -109 -56 -232 -56 -240 -57 -269 -20 -343 27
-52 84 -95 146 -109 l53 -12 0 -378 0 -378 26 -20 c35 -27 59 -26 89 4 l25 24
0 375 0 374 40 7 c58 10 130 62 157 114 34 64 30 123 -23 354 -45 194 -63 243
-83 222 -5 -6 -14 -100 -21 -210 -7 -110 -14 -203 -17 -207 -2 -5 -15 -8 -28
-8 -30 0 -29 -6 -56 230 -20 184 -28 215 -50 193 -8 -8 -54 -336 -59 -415 0
-5 -13 -8 -29 -8 -27 0 -29 2 -34 58 -4 31 -9 118 -13 192 -4 74 -11 145 -15
158 -8 22 -24 29 -32 15z"
													/>
													<path
														d="M2581 2300 c-78 -37 -179 -137 -215 -214 -14 -29 -30 -82 -35 -117
-15 -91 -14 -501 1 -534 19 -41 57 -55 153 -55 l85 0 0 -239 c0 -133 4 -251
10 -266 11 -28 53 -49 81 -40 51 17 49 -16 49 750 l0 714 -22 15 c-30 21 -33
21 -107 -14z"
													/>
													<path
														d="M1665 2270 c-101 -15 -224 -62 -281 -108 l-22 -17 19 -80 c10 -44 21
-90 24 -103 l6 -23 38 30 c155 123 375 145 552 55 57 -28 137 -99 179 -157
l28 -37 7 82 c4 46 14 103 21 128 l14 45 -36 30 c-152 127 -356 184 -549 155z"
													/>
													<path
														d="M1675 1967 c-74 -20 -132 -53 -186 -107 -224 -224 -108 -605 206
-670 167 -35 350 58 431 217 27 54 29 66 29 173 0 107 -2 119 -29 173 -40 79
-137 168 -213 197 -72 27 -172 34 -238 17z"
													/>
													<path
														d="M1228 1556 l-28 -10 0 -189 0 -190 83 -82 c90 -89 197 -151 309 -179
292 -74 591 41 759 292 l50 76 -50 18 c-29 11 -64 35 -84 57 l-35 39 -18 -41
c-11 -23 -48 -72 -83 -109 -107 -114 -238 -166 -396 -155 -236 15 -439 202
-462 425 -3 29 -9 54 -12 56 -3 1 -18 -2 -33 -8z"
													/>
												</g>
											</svg>
										)}

										{e == "Free breakfast" && (
											<svg
												fill="#000000"
												height="19px"
												width="19px"
												version="1.1"
												id="Layer_1"
												xmlns="http://www.w3.org/2000/svg"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												viewBox="0 0 447 447"
												xmlSpace="preserve"
											>
												<g>
													<g>
														<g>
															<path
																d="M381.539,65.462C339.325,23.248,283.199,0,223.5,0C163.801,0,107.675,23.248,65.461,65.462
													  C23.248,107.675,0,163.801,0,223.5c0,59.699,23.248,115.825,65.461,158.038C107.675,423.752,163.801,447,223.5,447
													  c59.699,0,115.825-23.248,158.039-65.462C423.752,339.325,447,283.199,447,223.5C447,163.801,423.752,107.675,381.539,65.462z
													  M223.5,432C108.533,432,15,338.468,15,223.5S108.533,15,223.5,15S432,108.532,432,223.5S338.467,432,223.5,432z"
															/>
															<path
																d="M183.5,247c30.603,0,55.5-24.897,55.5-55.5c0-30.603-24.897-55.5-55.5-55.5c-30.603,0-55.5,24.897-55.5,55.5
													  C128,222.103,152.897,247,183.5,247z M183.5,151c22.332,0,40.5,18.168,40.5,40.5c0,22.332-18.168,40.5-40.5,40.5
													  c-22.332,0-40.5-18.168-40.5-40.5C143,169.168,161.168,151,183.5,151z"
															/>
															<path
																d="M380.111,280.267l-6.133-15.978c0.146-0.425,0.255-0.869,0.324-1.33c1.571-10.528,1.792-21.374,0.657-32.238
													  c-4.859-46.505-27.097-65.102-56.246-84.384c1.316-1.082,2.593-2.234,3.822-3.463c13.845-13.845,18.449-33.661,11.458-49.311
													  c-0.753-1.687-2.102-3.036-3.789-3.789c-15.65-6.989-35.467-2.386-49.312,11.459c-3.951,3.951-7.146,8.389-9.537,13.077
													  c-3.813-2.853-7.511-5.713-11.149-8.647c-31.669-25.54-84.102-27.595-124.673-4.889c-42.339,23.695-62.558,68.777-55.473,123.687
													  c3.635,28.174,18.207,55.76,41.473,79.026c-2.5,0.618-5.257,1.468-8.371,2.663c-1.857,0.713-3.355,2.134-4.164,3.951
													  c-0.809,1.817-0.863,3.882-0.15,5.738l22.935,59.75c0.713,1.857,2.134,3.355,3.952,4.164c0.969,0.432,2.009,0.648,3.05,0.648
													  c0.91,0,1.822-0.166,2.688-0.498c8.465-3.25,13.009-3.254,18.271-3.26c5.896-0.006,12.578-0.013,23.63-4.255
													  c11.054-4.244,16.026-8.71,20.412-12.651c2.246-2.017,4.32-3.876,7.275-5.708c13.417,3.35,26.701,5.056,39.583,5.056
													  c1.713,0,3.421-0.029,5.12-0.09c68.614-2.421,97.228-39.832,108.35-62.725c2.765-2.143,6.13-4.183,11.683-6.314
													  C379.664,288.472,381.596,284.134,380.111,280.267z"
															/>
														</g>
													</g>
												</g>
											</svg>
										)}

										{e == "City view" && <i className="fa-solid fa-city"></i>}
										{e == "Tea Ceremony Room" && (
											<i className="fa-solid fa-mug-hot"></i>
										)}

										{e == "Rooftop bar" && (
											<i className="fa-solid fa-martini-glass-citrus"></i>
										)}
										{e == "Hot Spring Access" && (
											<svg
												width="22px"
												height="22px"
												viewBox="0 0 60.601 60.601"
												version="1.1"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="m7.7855 56.032c-1.7762 0-3.2162-1.44-3.2162-3.2162v-45.031c0-1.7775 1.44-3.2162 3.2162-3.2162h45.031c1.7762 0 3.215 1.4388 3.215 3.2162v45.031c0 1.7762-1.4388 3.2162-3.215 3.2162h-45.031z"
													style={{
														fill: "#ffffff",
														strokeWidth: ".60625",
														stroke: "#000",
													}}
												/>
												<path
													d="m20.201 34.854c1.16 0 2.102-0.94196 2.102-2.102 0-1.16-0.94198-2.102-2.102-2.102-1.16 0-2.102 0.94196-2.102 2.102 0 1.16 0.94198 2.102 2.102 2.102"
													style={{ fill: "#000" }}
												/>
												<path
													d="m30.301 37.968c1.0466 0 1.8926-0.84601 1.8926-1.8926 0-1.0466-0.84601-1.8927-1.8926-1.8927-1.0466 0-1.8927 0.84604-1.8927 1.8927 0 1.0466 0.84604 1.8926 1.8927 1.8926"
													style={{ fill: "#000" }}
												/>
												<path
													d="m45.965 36.799c0.29654 0.5582 0.47099 1.1949 0.47972 1.8578 1.3606 0.88091 2.1369 1.8839 2.1369 2.9567 0 3.4801-8.1899 6.2973-18.281 6.2973-10.091 0-18.272-2.8172-18.272-6.2973 0-1.0641 0.77626-2.0758 2.1369-2.9567 0-0.66288 0.17438-1.2909 0.47099-1.8578-3.1486 1.5351-5.0674 3.5411-5.0674 5.7391 0 4.8319 9.2889 8.7481 20.732 8.7481 11.452 0 20.732-3.9162 20.732-8.7481 0-2.1979-1.9101-4.204-5.0674-5.7391"
													style={{ fill: "#000" }}
												/>
												<path
													d="m37.645 22.451c0.27037 0.49716 0.41865 1.0641 0.41865 1.6659 0 1.6572-1.16 3.044-2.7212 3.3928l0.53204 1.8839c2.5381-0.61927 4.422-2.9044 4.422-5.6344 0-1.0728-0.29654-2.0758-0.80243-2.9393l-3.1835-5.5035c-0.27037-0.48843-0.41865-1.0554-0.41865-1.6572 0-1.6659 1.16-3.044 2.7212-3.3928l-0.53203-1.8926c-2.5381 0.61925-4.422 2.9044-4.422 5.6344 0 1.0728 0.28783 2.0846 0.80243 2.948z"
													style={{ fill: "#000" }}
												/>
												<path
													d="m30.833 22.451c0.27037 0.49716 0.41865 1.0641 0.41865 1.6659 0 1.6572-1.16 3.044-2.7212 3.3928l0.53204 1.8839c2.5381-0.61927 4.422-2.9044 4.422-5.6344 0-1.0728-0.28783-2.0758-0.80243-2.9393l-3.1835-5.5035c-0.27037-0.48843-0.41865-1.0554-0.41865-1.6572 0-1.6659 1.16-3.044 2.7212-3.3928l-0.53203-1.8926c-2.5381 0.61925-4.422 2.9044-4.422 5.6344 0 1.0728 0.28783 2.0846 0.80243 2.948z"
													style={{ fill: "#000" }}
												/>
												<path
													d="m24.021 22.451c0.27037 0.49716 0.41865 1.0641 0.41865 1.6659 0 1.6572-1.16 3.044-2.7212 3.3928l0.53203 1.8839c2.5381-0.61927 4.422-2.9044 4.422-5.6344 0-1.0728-0.28783-2.0758-0.80243-2.9393l-3.1835-5.5035c-0.27037-0.48843-0.41865-1.0554-0.41865-1.6572 0-1.6659 1.16-3.044 2.7212-3.3928l-0.53204-1.8926c-2.5381 0.61925-4.422 2.9044-4.422 5.6344 0 1.0728 0.29654 2.0846 0.80243 2.948z"
													style={{ fill: "#000" }}
												/>
												<path
													d="m15.308 42.154c0.54077-0.03483 1.0205-0.27037 1.3781-0.62798h0.27037c0.39251 0.40122 0.95071 0.63671 1.5525 0.63671 0.61052 0 1.16-0.2355 1.5612-0.63671h0.26164c0.40121 0.40122 0.95069 0.63671 1.5612 0.63671 0.60181 0 1.1513-0.2355 1.5525-0.63671h0.26166c0.36632 0.35761 0.85474 0.5931 1.3955 0.63671l0.17438-3.262c0.10471-1.5699-1.0118-3.0003-2.5992-3.2358-0.80241-0.12213-1.631-0.18309-2.477-0.18309-0.83731 0-1.6572 0.06096-2.4596 0.18309-1.5961 0.2355-2.7125 1.6659-2.5992 3.2358z"
													style={{ fill: "#000" }}
												/>
												<path
													d="m38.307 32.752c0 1.16 0.94198 2.102 2.102 2.102 1.16 0 2.102-0.94196 2.102-2.102 0-1.16-0.94198-2.102-2.102-2.102-1.16 0-2.102 0.94196-2.102 2.102"
													style={{ fill: "#000" }}
												/>
												<path
													d="m37.95 35.665c-1.5961 0.2355-2.7125 1.6659-2.6079 3.2358l0.17438 3.2533c0.53206-0.04354 1.0205-0.27037 1.3781-0.62798h0.26166c0.40122 0.39248 0.95069 0.63671 1.5612 0.63671 0.60181 0 1.16-0.24423 1.5525-0.63671h0.27037c0.40121 0.39248 0.95071 0.63671 1.5525 0.63671 0.61052 0 1.16-0.24423 1.5612-0.63671h0.26164c0.36634 0.35761 0.85476 0.5931 1.3955 0.63671l0.16567-3.262c0.11342-1.5699-1.003-3.0003-2.5904-3.2358-0.81116-0.12213-1.631-0.18309-2.477-0.18309-0.83731 0-1.6572 0.06096-2.4596 0.18309"
													style={{ fill: "#000" }}
												/>
												<path
													d="m30.301 38.596c-0.62798 0-1.256 0.05225-1.8752 0.13955-1.2124 0.18309-2.0671 1.2647-1.9799 2.4683l0.05225 0.91581c0.13955 0.03483 0.2791 0.04354 0.42738 0.04354 0.60181 0 1.1513-0.24422 1.5525-0.63671h0.27037c0.40122 0.39249 0.95071 0.63671 1.5525 0.63671 0.61052 0 1.16-0.24422 1.5612-0.63671h0.26164c0.40122 0.39249 0.95069 0.63671 1.5612 0.63671 0.14825 0 0.29654-0.0089 0.43609-0.04354l0.05225-0.91581c0.07859-1.2036-0.76753-2.2852-1.9799-2.4683-0.61925-0.0873-1.2472-0.13955-1.8926-0.13955"
													style={{ fill: "#000" }}
												/>
											</svg>
										)}

										{e}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* <!-- Right Column: Booking Card --> */}

					<ReservationCard HotelReserveData={singleData} />
				</div>
			</div>

			{/* <!-- Reviews Section --> */}
			<div className="max-w-7xl mx-auto px-6 py-12 border-t">
				{/* <!-- Reviews Header with Average Rating --> */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-4">
						<h2 className="text-2xl font-semibold">Reviews</h2>
						<div className="flex items-center">
							<i className="fas fa-star text-yellow-500 mr-2"></i>
							<span className="text-xl font-semibold">4.9</span>
							<span className="mx-2">·</span>
							<span className="text-gray-600">2 reviews</span>
						</div>
					</div>

					<ReviewModal />
				</div>

				{/* <!-- Reviews Grid --> */}
				<div className="grid grid-cols-2 gap-8">
					{/* <!-- Review Card 1 --> */}
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
								<Image
									width={40}
									height={40}
									src="/"
									alt="User avatar"
									className="w-full h-full object-cover"
								/>
							</div>
							<div>
								<h4 className="font-medium">John Smith</h4>
								<p className="text-gray-500 text-sm">December 2024</p>
							</div>
						</div>
						<div className="flex items-center">
							<i className="fas fa-star text-yellow-500"></i>
							<i className="fas fa-star text-yellow-500"></i>
							<i className="fas fa-star text-yellow-500"></i>
							<i className="fas fa-star text-yellow-500"></i>
							<i className="fas fa-star text-yellow-500"></i>
						</div>
						<p className="text-gray-600 leading-relaxed">
							Amazing stay! The villa exceeded our expectations. The private
							pool and beach access were highlights of our trip. Sarah was an
							excellent host, always responsive and helpful.
						</p>
					</div>
				</div>

				{/* <!-- Show More Button --> */}
			</div>
		</div>
	);
}
