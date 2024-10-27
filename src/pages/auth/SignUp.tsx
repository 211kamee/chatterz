import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LoginForm() {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	return (
		<div className="absolute w-full h-full flex justify-center items-center">
			<Card className="mx-auto max-w-sm ">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="user123"
								required
								value={inputs.username}
								onChange={(e) =>
									setInputs({
										...inputs,
										username: e.target.value,
									})
								}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="user@example.com"
								required
								value={inputs.email}
								onChange={(e) =>
									setInputs({
										...inputs,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								required
								value={inputs.password}
								onChange={(e) =>
									setInputs({
										...inputs,
										password: e.target.value,
									})
								}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type="password"
								required
								value={inputs.confirmPassword}
								onChange={(e) =>
									setInputs({
										...inputs,
										confirmPassword: e.target.value,
									})
								}
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
							onClick={() => console.log(inputs)}
						>
							Create an account
						</Button>
						<Button variant="outline" className="w-full">
							Sign up with Google
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link to="/auth/login" className="underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
