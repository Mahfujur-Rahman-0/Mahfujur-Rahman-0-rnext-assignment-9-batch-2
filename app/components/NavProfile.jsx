import Image from "next/image";

export default function NavProfile({ userData }) {
	return userData?.user?.image ? (
		<span className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white overflow-hidden">
			<Image
				width={30}
				height={30}
				src={userData?.user?.image || "/default-avatar.png"}
				alt={userData?.user?.name || "User"}
			/>
		</span>
	) : (
		<span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
			<i className="fas fa-user text-white"></i>
		</span>
	);
}
