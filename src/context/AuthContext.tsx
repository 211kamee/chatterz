import { useState, createContext, useContext } from "react";

interface AuthContextType {
	user: any; // Replace `any` with a more specific type if possible
	setUser: (user: any) => void; // Adjust type accordingly
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
});

interface AuthContextProviderProps {
	children: any;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user") || "null")
	);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
