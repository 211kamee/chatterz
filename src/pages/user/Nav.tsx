import { Link, Outlet, useNavigate } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLogout from "@/hooks/useLogout";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { useAuthContext } from "@/context/AuthContext";

export default function Nav() {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	const navigate = useNavigate();
	return (
		<>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<div className="items-center gap-4 text-2xl font-extrabold md:ml-auto md:gap-2 lg:gap-4">
					<Link to="/">ChatterZ</Link>
				</div>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
							<Input
								placeholder="Search people..."
								className="pl-9"
								
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full"
							>
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">
									Toggle user menu
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>
								{user.username}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => (navigate("/user/settings"))}
							>
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>
								Logout
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<ModeToggle />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<Outlet />
		</>
	);
}
