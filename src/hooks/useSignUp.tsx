import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function useSignUp() {
	const [loading, setLoading] = useState(false);

	const signup = async ({
		username = "",
		email = "",
		password = "",
		confirmPassword = "",
	}) => {
		const success = handleInputError({
			username,
			email,
			password,
			confirmPassword,
		});

		if (success) {
			try {
				await axios.post("http://localhost:5000/api/auth/signup", {
					username,
					email,
					password,
					confirmPassword,
				});
				toast.success("Signup successful!");
				setLoading(true);
			} catch (error) {
				const errorMessage = (error as Error).message;
				toast.error(errorMessage);
			} finally {
				setLoading(false);
			}

			return { loading, signup };
		}

		return;
	};
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

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 8) {
		toast.error("Password must be at least 8 characters long");
		return false;
	}

	if (password.includes(" ") || username.includes(" ")) {
		toast.error("Username and password must not contain spaces!");
	}

	if (!isAlphaNumeric(username)) {
		toast.error("Only alphabet and numbers are allowed!");
	}

	if (username.length < 4 || username.length > 20) {
		toast.error("Username must be at least 4 to 20 characters long!");
	}

	if (password.length < 8 && password.length > 20) {
		toast.error("Password must be at least 8 to 20 characters long!");
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
