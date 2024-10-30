import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";

export default function useLogin() {
	const { setUser } = useAuthContext();

	const [loading, setLoading] = useState(false);

	const login = async ({ username = "", password = "" }) => {
		setLoading(true);
		if (!username || !password) {
			toast.error("All fields are required");
			return false;
		}
		try {
			await axios
				.post("/api/auth/login", {
					username,
					password,
				})
				.then((res) => {
					toast.success(`Logged in as ${username}!`);
					localStorage.setItem("user", JSON.stringify(res.data));
					setUser(res.data);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
					throw err;
				});
			setLoading(false);
			return true;
		} catch (error: any) {
			toast.error(error.response?.data || "Something went wrong!");
			return false;
		}
	};

	return { login, loading };
}
