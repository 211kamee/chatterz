import { useAuthContext } from "@/context/AuthContext";

export default function UserDash() {
	const { user } = useAuthContext();
	return (
		<>
			<div>Dash is under construction.</div>
			<h1>
				{" "}
				{user ? `Logged in as ${user.username}` : "Not logged in?"}
			</h1>
		</>
	);
}
