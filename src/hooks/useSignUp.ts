import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";

export default function useSignUp() {
	const { setUser } = useAuthContext();

	const [loading, setLoading] = useState(false);

	const signup = async ({
		username = "",
		email = "",
		password = "",
		confirmPassword = "",
	}) => {
		setLoading(true);
		if (!handleInputError({ username, email, password, confirmPassword })) {
			return false;
		}
		try {
			await axios
				.post("/api/auth/signup", {
					username,
					email,
					password,
					confirmpassword: confirmPassword,
				})
				.then((res) => {
					toast.success("Account created successfully!");
					localStorage.setItem("user", JSON.stringify(res.data));
					setUser(res.data);
				})
				.catch((err) => {
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

	return { signup, loading };
}

function handleInputError({
	username = "",
	email = "",
	password = "",
	confirmPassword = "",
}) {
	if (!username || !email || !password || !confirmPassword) {
		toast.error("All fields are required");
		return false;
	}

	if (
		!String(email).match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	) {
		toast.error("Not a valid email address");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match!");
		return false;
	}

	if (password.length < 8) {
		toast.error("Password must be at least 8 characters long");
		return false;
	}

	if (password.includes(" ") || username.includes(" ")) {
		toast.error("Username and password must not contain spaces!");
		return false;
	}

	if (!isAlphaNumeric(username)) {
		toast.error("Only alphabet and numbers are allowed!");
		return false;
	}

	if (username.length < 4 || username.length > 20) {
		toast.error("Username must be at least 4 to 20 characters long!");
		return false;
	}

	if (password.length < 8 && password.length > 20) {
		toast.error("Password must be at least 8 to 20 characters long!");
		return false;
	}

	return true;
}

const isAlphaNumeric = (str = "") => {
	var code, i, len;

	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (
			!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123) // lower alpha (a-z)
		)
			return false;
	}
	return true;
};
