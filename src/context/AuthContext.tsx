import { useState, createContext, useContext } from "react";

interface AuthContextType {
	user: any;
	setUser: (user: any) => void;
	API_URL: String;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
	API_URL: "",
});

export const AuthContextProvider = ({ children }: { children: any }) => {
	const dev = false;
	const API_URL = dev
		? "http://localhost:3000"
		: "https://chatterzapi.onrender.com";
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user") || "null") || null
	);

	return (
		<AuthContext.Provider value={{ API_URL, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
