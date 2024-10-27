import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function App() {
	return (
		<>
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<p>Start your conversations now!</p>
				<Button asChild className="w-full md:w-36">
					<Link to="/auth/login">Login!</Link>
				</Button>
				<Button asChild className="w-full md:w-36">
					<Link to="/auth/signup">Sign Up?</Link>
				</Button>
			</main>
		</>
	);
}
