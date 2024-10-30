import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* Self Note: Add basename to use directory as root [ '/docs' as '/'] */}
		<BrowserRouter basename="">
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</BrowserRouter>
	</StrictMode>
);
