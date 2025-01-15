"use client";
import { DeleteHandler, getData } from "@/app/api/formhandeler";
import UseContextApi from "@/app/Context/Context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ManageHotels() {
	const router = useRouter();
	const { data, setData, user, setEditData } = UseContextApi();
	const currentUrl = router.asPath;
	useEffect(() => {
		if (currentUrl != "/pages/CreateHotel") {
			setEditData(null);
		}
	}, [currentUrl, setEditData]);
	const fetchData = async () => {
		try {
			const result = await getData();
			setData({
				Hotels: result.HotelList,
				error: null,
				loading: false,
			});
		} catch (error) {
			console.error("Error fetching data:", error);
			setData({
				Hotels: [],
				error: "Error fetching data",
				loading: false,
			});
		}
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handelDelete = async (bb) => {
		const res = await DeleteHandler(bb);
		if (res.message) {
			await fetchData();
		}
	};
	return (
		<div className="bg-gray-50 font-sans ">
			<div className="max-w-7xl mx-auto px-4 pb-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-zinc-800">Manage Hotels</h1>
					<button
						onClick={() => router.push("/pages/CreateHotel")}
						className="bg-primary text-white px-4 py-2 rounded-lg hover:brightness-90 transition-colors"
					>
						+ Create Hotel
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* <!-- Hotel Card --> */}
					{data?.Hotels.filter(
						(ee) => ee.email == user.email && ee.owner == user.name
					).map((e, i) => (
						<DeleteCard
							key={e._id}
							handelDelete={handelDelete}
							e={e}
							setEditData={setEditData}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function DeleteCard({ e, handelDelete, setEditData }) {
	const [show, setHide] = useState(true);

	return (
		<div className={` ${!show && "hidden"} overflow-hidden cursor-pointer`}>
			<Link href={`/pages/SinglePage/${e._id}`}>
				<div className="relative  rounded-md  overflow-hidden">
					<Image
						width={400}
						height={192}
						src={e.thumbNailUrl || "/"}
						alt="Hotel Property"
						className="w-full h-48 object-cover transition-all hover:scale-105"
					/>
					<div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold">
						<i className="fas fa-star text-yellow-500 mr-1"></i>0
					</div>
				</div>
			</Link>
			<div className="p-4">
				<Link href={`/pages/SinglePage/${e._id}`}>
					<h2 className="text-lg font-semibold text-zinc-800 mb-2">{e.name}</h2>

					<div className="flex justify-between items-center">
						<span className="text-zinc-600">
							{e.availableRooms} Rooms Available
						</span>
						<span className="text-rose-600 font-semibold">
							${e.pricePerNight}/night
						</span>
					</div>
				</Link>
				<div className="flex justify-between items-center">
					<span className="text-zinc-500">Location: {e.location}</span>
					<div className="space-x-2">
						<Link
							onClick={() => setEditData(e)}
							href="/pages/CreateHotel"
							className="text-blue-500 hover:text-blue-600"
						>
							<i className="fas fa-edit"></i>
						</Link>
						<button
							onClick={() => (setHide(false), handelDelete(e._id))}
							className="text-red-500 hover:text-red-600"
						>
							<i className="fas fa-trash"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
