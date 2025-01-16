"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getData } from "../api/formhandeler";
import Link from "next/link";
import Pagination from "./Pagination";
import UseContextApi from "../Context/Context";

export default function MainPage() {
	const { data, setData, search } = UseContextApi();
	const [PageNum, setPageNum] = useState(1);
	const [counter, setCounter] = useState(8);
	const lastIndex = PageNum * counter;
	const firstIndex = lastIndex - counter;

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				if (isMounted) {
					const result = await getData();
					setData({
						Hotels: result.HotelList,
						error: null,
						loading: false,
					});
				}
			} catch (error) {
				if (isMounted) {
					console.error("Error fetching data:", error);
					setData({
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
	}, [setData]);

	const filteredData = data.Hotels?.filter(
		(e) => e?.name?.toLowerCase().includes(search?.toLowerCase()) && e
	);

	return (
		<div>
			{/* <!-- Hotel Listing Section --> */}
			{data.loading ? (
				<>
					<div
						aria-label="Orange and tan hamster running in a metal wheel"
						role="img"
						className="wheel-and-hamster mx-auto my-60"
					>
						<div className="wheel"></div>
						<div className="hamster">
							<div className="hamster__body">
								<div className="hamster__head">
									<div className="hamster__ear"></div>
									<div className="hamster__eye"></div>
									<div className="hamster__nose"></div>
								</div>
								<div className="hamster__limb hamster__limb--fr"></div>
								<div className="hamster__limb hamster__limb--fl"></div>
								<div className="hamster__limb hamster__limb--br"></div>
								<div className="hamster__limb hamster__limb--bl"></div>
								<div className="hamster__tail"></div>
							</div>
						</div>
						<div className="spoke"></div>
					</div>
				</>
			) : (
				<section className="px-6">
					<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{!search &&
							data.Hotels?.slice(firstIndex, lastIndex).map((e) => (
								<Link
									key={e._id + "HotelList"}
									href={`pages/SinglePage/${e._id}`}
									className="block group"
								>
									<div>
										<div className="relative">
											<Image
												width={500}
												height={400}
												src={e.thumbNailUrl || "/"}
												alt="Maldives Paradise"
												className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
											/>
											<div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
												<i className="ph-bed inline-block mr-1"></i>
												{e.availableRooms} Rooms Left
											</div>
										</div>
										<div className="mt-3">
											<div className="flex justify-between items-center">
												<h3 className="font-bold text-lg">{e.name}</h3>
												<div className="flex items-center">
													<svg
														className="w-4 h-4 text-yellow-500"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
													</svg>
													<span className="ml-1 text-zinc-600">{e.rating}</span>
												</div>
											</div>
											<p className="text-zinc-500 text-sm mt-1">
												{e.amenities.map((ee, i) => (
													<span key={i + e._id + e.name + "Jeem"}>{ee} , </span>
												))}
											</p>
											<div className="mt-2 flex justify-between items-center">
												<div>
													<span className="font-bold">${e.pricePerNight}</span>{" "}
													<span className="text-zinc-500 text-sm">
														Per Night
													</span>
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						{search &&
							data.Hotels?.filter(
								(e) =>
									e?.name?.toLowerCase().includes(search?.toLowerCase()) && e
							)
								?.slice(firstIndex, lastIndex)
								.map(
									(e) =>
										e?.name?.toLowerCase().includes(search?.toLowerCase()) && (
											<Link
												key={e._id + "HotelList"}
												href={`pages/SinglePage/${e._id}`}
												className="block group"
											>
												<div>
													<div className="relative">
														<Image
															width={500}
															height={400}
															src={e.thumbNailUrl || "/"}
															alt="Maldives Paradise"
															className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
														/>
														<div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
															<i className="ph-bed inline-block mr-1"></i>
															{e.availableRooms} Rooms Left
														</div>
													</div>
													<div className="mt-3">
														<div className="flex justify-between items-center">
															<h3 className="font-bold text-lg">{e.name}</h3>
															<div className="flex items-center">
																<svg
																	className="w-4 h-4 text-yellow-500"
																	fill="currentColor"
																	viewBox="0 0 20 20"
																>
																	<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
																</svg>
																<span className="ml-1 text-zinc-600">
																	{e.rating}
																</span>
															</div>
														</div>
														<p className="text-zinc-500 text-sm mt-1">
															{e.amenities.map((ee, i) => (
																<span key={i + e._id + e.name + "Jeem"}>
																	{ee} ,{" "}
																</span>
															))}
														</p>
														<div className="mt-2 flex justify-between items-center">
															<div>
																<span className="font-bold">
																	${e.pricePerNight}
																</span>{" "}
																<span className="text-zinc-500 text-sm">
																	Per Night
																</span>
															</div>
														</div>
													</div>
												</div>
											</Link>
										)
								)}
					</div>
				</section>
			)}
			<Pagination
				dataLength={!search ? data?.Hotels?.length : filteredData?.length}
				setPageNum={setPageNum}
				PageNum={PageNum}
				counter={counter}
			/>
		</div>
	);
}
