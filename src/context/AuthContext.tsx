import { useState, createContext, useContext } from "react";

interface AuthContextType {
	user: any;
	setUser: (user: any) => void;
	searchQuery: any;
	setSearchQuery: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
	searchQuery: null,
	setSearchQuery: () => {},
});

export const AuthContextProvider = ({ children }: { children: any }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user") || "null") || null
	);

	const [searchQuery, setSearchQuery] = useState("");

	return (
		<AuthContext.Provider
			value={{ user, setUser, searchQuery, setSearchQuery }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
