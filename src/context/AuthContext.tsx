import { useState, createContext, useContext } from "react";

interface AuthContextType {
	user: any;
	setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
});

export const AuthContextProvider = ({ children }: { children: any }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user") || "null") || null
	);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
