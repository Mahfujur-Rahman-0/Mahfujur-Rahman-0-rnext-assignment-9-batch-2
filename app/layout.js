import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@/auth";
import Navbar from "./components/Navbar";
import { ContextProvider } from "./Context/Context";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
	const userData = await auth();

	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
				/>
			</head>

			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ContextProvider>
					{/* <!-- Navbar --> */}

					<Navbar userData={userData} />
					<div className="min-h-[79vh]">{children}</div>
					<footer className="mt-12 text-sm text-zinc-500 max-w-7xl mx-auto py-4">
						<p>
							© 2024 Learn with Sumit • Terms • Privacy • Your Privacy Choices
						</p>
					</footer>
				</ContextProvider>
			</body>
		</html>
	);
}
