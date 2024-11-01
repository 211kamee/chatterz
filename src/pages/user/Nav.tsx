import { Link, Outlet } from "react-router-dom";
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

export default function Nav() {
	const { logout, loading } = useLogout();
	return (
		<>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<div className="items-center gap-4 text-2xl font-extrabold md:ml-auto md:gap-2 lg:gap-4">
					<Link to="/">ChatterZ</Link>
				</div>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search..."
								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
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
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<ModeToggle />
							<DropdownMenuItem
								disabled={loading}
								onClick={logout}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<Outlet />
		</>
	);
}
