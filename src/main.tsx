import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Toaster } from "sonner";
import App from "./App.jsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* Self Note: Add basename to use directory as root [ '/docs' as '/'] */}
		<BrowserRouter basename="">
			<Toaster />
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
