"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProfileUploadImage() {
	const [image, setImage] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<div className="relative w-full">
				<input
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					type="file"
					name="ProfileImg"
					accept="image/*"
					onChange={handleFileChange}
				/>
				<label
					htmlFor="ProfileImg"
					className="w-full block border border-gray-300 rounded-full px-4 py-3 bg-gray-100 text-center text-gray-600 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
				>
					Choose Profile Pic <i class="fa-solid fa-file-import"></i>
				</label>
			</div>

			{image && (
				<div>
					<h3 className="text-center">Uploaded Image:</h3>
					<Image
						style={{ aspectRatio: 1 }}
						className="w-[100px] mx-auto mt-0"
						src={image}
						alt="Uploaded Image"
						width={500}
						height={500}
					/>
				</div>
			)}
		</div>
	);
}
