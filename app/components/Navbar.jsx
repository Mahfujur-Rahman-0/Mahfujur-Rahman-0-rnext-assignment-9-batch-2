"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavProfile from "./NavProfile";
import SignoutBTN from "./GoogleBTN";
import UseContextApi from "../Context/Context";

export default function Navbar({ userData }) {
	const [menuDrop, setMenuDrop] = useState(false);
	const { setUser, search, setSearch } = UseContextApi();

	useEffect(() => {
		setUser(userData?.user);
	}, [setUser, userData]);

	useEffect(() => {
		if (typeof window !== "undefined" && menuDrop === true) {
			const handleClickOutside = () => setMenuDrop(false);

			window.addEventListener("click", handleClickOutside);

			// Cleanup on unmount
			return () => {
				window.removeEventListener("click", handleClickOutside);
			};
		}
	}, [menuDrop]);

	return (
		<nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
			<div className="flex items-center">
				<a href="/">
					<Image
						width={100}
						height={80}
						src="/logo.svg"
						alt="Hotel Logo"
						className="h-8 w-auto"
					/>
				</a>
			</div>

			<div className="row-start-2 col-span-2 border-0 md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
				<div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow">
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						type="text"
						placeholder="Where to?"
						className="px-3 w-full bg-transparent focus:outline-none lg:col-span-3 placeholder:text-sm"
					/>
				</div>

				<button className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0">
					<i className="fas fa-search text-white"></i>
				</button>
			</div>

			<div className="flex items-center space-x-4 relative justify-end">
				<button>
					<i className="fas fa-language text-zinc-700 text-xl"></i>
				</button>
				<button
					onClick={(e) => (setMenuDrop(!menuDrop), e.stopPropagation())}
					className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
				>
					<i className="fas fa-bars"></i>
					<NavProfile userData={userData} />
				</button>

				{/* <!-- Popup --> */}
				<div
					className={`${
						!menuDrop ? "" : "border"
					} max-w-48 w-48 bg-white shadow-sm rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 `}
				>
					<ul
						className={`${
							!menuDrop ? "max-h-0" : "max-h-[300px]"
						} transition-all duration-300 overflow-hidden `}
					>
						{userData ? (
							<Link href="" className="w-full">
								<li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
									{userData?.user?.name}
								</li>
							</Link>
						) : (
							<Link href="/pages/LogIn" className="w-full">
								<li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
									Login
								</li>
							</Link>
						)}
						{userData && (
							<Link href="/pages/CreateHotel" className="w-full">
								<li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
									Create Hotel
								</li>
							</Link>
						)}
						{userData && (
							<Link href="/pages/ManageHotels" className="w-full">
								<li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
									Manage Hotels
								</li>
							</Link>
						)}
						{userData && (
							<Link href="/pages/Booking" className="w-full">
								<li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
									Bookings
								</li>
							</Link>
						)}
						{userData ? (
							<form action={SignoutBTN} className="w-full">
								<button
									type="submit"
									className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
								>
									Logout
								</button>
							</form>
						) : (
							<Link href="/pages/SignUp" className="w-full">
								<li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
									Signup
								</li>
							</Link>
						)}
						<Link href="/" className="w-full">
							<li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
								Help
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</nav>
	);
}
