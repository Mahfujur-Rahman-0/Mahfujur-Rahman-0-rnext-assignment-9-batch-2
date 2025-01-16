// import { NextResponse } from "next/server";

// import { getToken } from "next-auth/jwt";

// export async function middleware(request) {
// 	const { pathname } = new URL(request.url);
// 	console.log(pathname);
// 	// Getting the token from the NextAuth JWT
// 	const token = await getToken({
// 		req: request,
// 		secret: process.env.AUTH_SECRET,
// 	});
// 	console.log(token);
// 	// Checking if the user is authenticated or not !!
// 	if (!token) {
// 		// For write short code I have use double if condition
// 		if (pathname == "/pages/CreateHotel") {
// 			return NextResponse.redirect(new URL("/pages/LogIn", request.url));
// 		} else if (pathname == "/pages/ManageHotels") {
// 			return NextResponse.redirect(new URL("/pages/LogIn", request.url));
// 		} else if (pathname == "/pages/Booking") {
// 			return NextResponse.redirect(new URL("/pages/LogIn", request.url));
// 		} else if (pathname == "/pages/PaymentProcess") {
// 			return NextResponse.redirect(new URL("/pages/LogIn", request.url));
// 		}
// 	}

// 	if (pathname === "/") {
// 		return NextResponse.rewrite(new URL("/pages", request.url));
// 	}

// 	// Allow all other routes to proceed
// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: [
// 		"/",
// 		"/pages/CreateHotel",
// 		"/pages/ManageHotels",
// 		"/pages/Booking",
// 		"/pages/PaymentProcess",
// 	],
// };
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
	const { pathname } = new URL(request.url);

	console.log(pathname);

	// Prepare options for getToken
	const options = {
		req: request,
		secret: process.env.AUTH_SECRET,
	};

	// Enable secure cookies in production with HTTPS
	if (
		process.env.NODE_ENV === "production" &&
		request.url.startsWith("https")
	) {
		options.secureCookie = true;
	}

	// Get the session token
	const token = await getToken(options);
	console.log(token);

	// Define protected routes that require authentication
	const protectedRoutes = [
		"/pages/CreateHotel",
		"/pages/ManageHotels",
		"/pages/Booking",
		"/pages/PaymentProcess",
	];

	// Redirect unauthenticated users to login
	if (!token && protectedRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/pages/LogIn", request.url));
	}

	// Rewrite the root path to /pages
	if (pathname === "/") {
		return NextResponse.rewrite(new URL("/pages", request.url));
	}

	// Allow all other routes to proceed
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/pages/CreateHotel",
		"/pages/ManageHotels",
		"/pages/Booking",
		"/pages/PaymentProcess",
	],
};
