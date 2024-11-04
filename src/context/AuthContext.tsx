import { useState, createContext, useContext } from "react";

interface AuthContextType {
	user: any;
	setUser: (user: any) => void;
	searchQuery: any;
	setSearchQuery: (user: any) => void;
	API_URL: any;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
	searchQuery: null,
	setSearchQuery: () => {},
	API_URL: null,
});

export const AuthContextProvider = ({ children }: { children: any }) => {
	const API_URL = "https://chatterzapi.onrender.com";
	// const API_URL = "http://localhost:3000";
	const [searchQuery, setSearchQuery] = useState("");
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user") || "null") || null
	);

	return (
		<AuthContext.Provider
			value={{ API_URL, user, setUser, searchQuery, setSearchQuery }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
