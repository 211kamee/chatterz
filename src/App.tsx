import { Route, Routes } from "react-router-dom";
import Header from "./pages/Header.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/SignUp.tsx";
import Main from "./pages/Main.tsx";
import { Toaster } from 'react-hot-toast';

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" Component={Header}>
					<Route path="" Component={Main}></Route>
					<Route path="auth/">
						<Route path="login/" element={<Login />}></Route>
						<Route path="signup/" element={<Register />} />
					</Route>
				</Route>
			</Routes>
			<Toaster /> 
		</>
	);
}
