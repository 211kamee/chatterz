import { Route, Routes } from "react-router-dom";
import Header from "./pages/Header.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/SignUp.tsx";
import Main from "./pages/Hero.tsx";
import Nav from "./pages/user/Nav.tsx";
import UserDash from "./pages/user/UserDash.tsx";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Header />}>
				<Route path="" element={<Main />}></Route>
				<Route path="auth/">
					<Route path="login/" element={<Login />}></Route>
					<Route path="signup/" element={<Register />} />
				</Route>
			</Route>
			<Route path="/:username/" element={<Nav />}>
				<Route path="" element={<UserDash />}></Route>
			</Route>
		</Routes>
	);
}
