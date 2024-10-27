import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function Header() {
	const [theme, setTheme] = useState("Light");

	return (
		<>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<div className="flex w-full items-center gap-4 text-2xl font-extrabold md:ml-auto md:gap-2 lg:gap-4">
					<Link to="/">ChatterZ</Link>
				</div>

				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<Link
						to="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						About
					</Link>
					<Link
						to="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						FAQs
					</Link>
					<Link
						to="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						Contacts
					</Link>

					<Label htmlFor="theme">
						{theme[0].toLocaleUpperCase() + theme.slice(1)}
					</Label>
					<Switch
						id="theme"
						className=""
						onClick={() => {
							if (theme === "dark") {
								document
									.querySelector("html")
									?.setAttribute("class", theme);
								setTheme("light");
							} else {
								document
									.querySelector("html")
									?.setAttribute("class", theme);
								setTheme("dark");
							}
						}}
					/>
				</nav>

				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">
								Toggle navigation menu
							</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="top">
						<SheetHeader>
							<VisuallyHidden.Root>
								<SheetTitle>Nav Content</SheetTitle>
							</VisuallyHidden.Root>
							<SheetDescription>{""}</SheetDescription>
						</SheetHeader>

						<nav className="grid gap-4 text-lg font-medium justify-center">
							<Link
								to="#"
								className="flex items-center gap-2 text-lg font-extrabold "
							>
								ChatterZ
							</Link>
							<Separator orientation="vertical" />
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								About
							</Link>
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								FAQs
							</Link>
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Contacts
							</Link>
							<div className="flex items-center">
								<Label htmlFor="theme">
									{theme[0].toLocaleUpperCase() +
										theme.slice(1)}
								</Label>
								<Switch
									id="theme"
									className="mx-4"
									onClick={() => {
										if (theme === "dark") {
											document
												.querySelector("html")
												?.setAttribute("class", theme);
											setTheme("light");
										} else {
											document
												.querySelector("html")
												?.setAttribute(
													"class",
													`mx-4 ${theme}`
												);
											setTheme("dark");
										}
									}}
								/>
							</div>
						</nav>
					</SheetContent>
				</Sheet>
			</header>
			<Outlet />
		</>
	);
}
