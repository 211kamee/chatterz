import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./pages/auth/Header.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/SignUp.tsx";
import Main from "./pages/auth/Hero.tsx";
import Nav from "./pages/user/Nav.tsx";
import ChatLayout from "./pages/user/Conversation.tsx";

export default function App() {
	return (
		<Routes>
			<Route path="/auth/" element={<Header />}>
				<Route path="" element={<Main />}></Route>
				<Route path="login/" element={<Login />}></Route>
				<Route path="signup/" element={<Register />}>
					{" "}
				</Route>
			</Route>
			<Route path="/user/">
				<Route path="" element={<Navigate to="/user/convo" />}></Route>
				<Route path="convo/" element={<Nav />}>
					<Route path="" element={<ChatLayout />}></Route>
				</Route>
				<Route path="settings/" element={<h1> Profile</h1>}></Route>
			</Route>
			<Route path="*" element={<Navigate to="/auth" />}></Route>
		</Routes>
	);
}
