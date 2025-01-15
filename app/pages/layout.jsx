export default function AuthLayout({ children, auth }) {
	return (
		<>
			{auth}
			{children}
		</>
	);
}
