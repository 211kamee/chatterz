import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./pages/Header.tsx";
import App from "./App.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/SignUp.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		// Self Note: Add basename to use directory as root [ '/docs' as '/']
		<BrowserRouter basename="">
			<Routes>
				<Route path="/" Component={Header}>
					<Route path="" Component={App}></Route>
					<Route path="auth/">
						<Route path="login/" element={<Login />}></Route>
						<Route path="signup/" element={<Register />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
