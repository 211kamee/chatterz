import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Search, Send } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext.tsx";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Rest of the code remains exactly the same...
const ContactCard = ({
	username = "User",
	avatarUrl = "",
	isSelected = { Boolean },
	onClick = () => {},
}) => {
	return (
		<div
			onClick={onClick}
			className={`
        flex items-center p-4 space-x-4 cursor-pointer transition-colors
        ${
			isSelected
				? "bg-gray-100 dark:bg-gray-700"
				: "hover:bg-gray-50 dark:hover:bg-gray-800"
		}
      `}
		>
			<div className="relative">
				<Avatar>
					<AvatarImage src={avatarUrl} alt={username} />
					<AvatarFallback>
						{username
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>
			</div>

			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
						{username}
					</h3>
				</div>
			</div>
		</div>
	);
};

const ConversationList = ({
	conversations,
	selectedId,
	onSelect,
}: {
	conversations: any;
	selectedId: any;
	onSelect: any;
}) => {
	const [searchQuery, setSearchQuery] = useState("");
	const filteredConversations = conversations.filter((people: any) =>
		people.username.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
					<Input
						placeholder="Search conversations..."
						className="pl-9"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Conversation List */}
			<ScrollArea className="flex-1">
				<div className="divide-y divide-gray-200 dark:divide-gray-700">
					{filteredConversations.length > 0 ? (
						filteredConversations.map((people: any) => {
							return (
								<ContactCard
									key={people._id}
									{...people}
									isSelected={selectedId === people._id}
									onClick={() => onSelect(people)}
								/>
							);
						})
					) : (
						<div className="p-4 text-center text-gray-500 dark:text-gray-400">
							No conversations found
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
};

const ChatLayout = () => {
	const { user, API_URL } = useAuthContext();
	const [selectedChat, setSelectedChat] = useState<any | null>(null);
	const [isMobileListVisible, setIsMobileListVisible] = useState(true);
	const [conversations, setConversations] = useState([]);
	const [messages, setMessages] = useState([]);
	const [sendMsg, setSendMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Sample data - you would typically fetch this from an API
	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(
					API_URL + "/api/conversations/people",
					{
						withCredentials: true,
					}
				);
				setConversations(res.data);
				return res.data;
			} catch (error: any) {
				console.log([error.message, error]);
				toast.error(error.response?.data || "Something went wrong!");
				navigate("/auth");
				return false;
			}
		})();
	}, []);

	const msgLoader = async (people: any) => {
		try {
			const res = await axios.get(
				API_URL + "/api/messages/" + people.username,
				{
					withCredentials: true,
				}
			);
			setMessages(res.data);
		} catch (error: any) {
			console.log([error.message, error]);
			toast.error(error.response?.data || "Something went wrong!");
		}
	};

	const handleChatSelect = (people: any) => {
		try {
			setSelectedChat(people);
		} catch (error) {}
		msgLoader(people);
		setIsMobileListVisible(false);
	};

	const handleBack = () => {
		setIsMobileListVisible(true);
		setSelectedChat(null);
	};

	const handleSendMsg = async () => {
		if (!sendMsg.trim()) {
			return;
		}
		setLoading(true);
		try {
			await axios.post(
				API_URL + "/api/messages/" + selectedChat.username,
				{ message: sendMsg.trim() },
				{
					withCredentials: true,
				}
			);
			setSendMsg("");
		} catch (error: any) {
			setLoading(false);
			console.log([error.message, error]);
		}
		msgLoader(selectedChat);
		setLoading(false);
	};

	return (
		<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100 dark:bg-gray-900">
			{/* Conversation List Panel */}
			<div
				className={`w-full md:w-80 md:flex-shrink-0 bg-white dark:bg-gray-800 
					border-r border-gray-200 dark:border-gray-700 flex-col 
					${isMobileListVisible ? "flex" : "hidden md:flex"}`}
			>
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<h1 className="text-xl font-semibold dark:text-white">
						Messages
					</h1>
				</div>
				<ConversationList
					conversations={conversations}
					selectedId={selectedChat?.id}
					onSelect={handleChatSelect}
				/>
			</div>

			{/* Chat Panel */}
			<div
				className={`max-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex flex-col ${
					!isMobileListVisible ? "flex" : "hidden md:flex"
				}`}
			>
				{selectedChat ? (
					<>
						{/* Chat Header */}
						<div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center">
							<Button
								variant="ghost"
								size="icon"
								className="mr-2"
								onClick={handleBack}
							>
								<ArrowLeft className="h-5 w-5" />
							</Button>
							<div className="flex-1">
								<h2 className="font-semibold dark:text-white">
									{selectedChat.username}
								</h2>
							</div>
						</div>

						{/* Messages Area */}
						<ScrollArea className="flex-1 p-4 bg-gray-200 dark:bg-gray-900">
							<div className="flex flex-col-reverse">
								{messages.map((message: any) => {
									return (
										<div
											key={message._id}
											className={`flex ${
												message.senderID === user._id
													? "justify-end"
													: "justify-start"
											} mb-4`}
										>
											<div
												className={`max-w-[70%] p-3 rounded-lg
                    						${
												message.senderID === user._id
													? "bg-white text-gray-700 dark:bg-gray-700 dark:text-white"
													: "bg-gray-700 text-white dark:bg-white dark:text-gray-700"
											}`}
											>
												{message.message}
											</div>
										</div>
									);
								})}
							</div>
						</ScrollArea>

						{/* Message Input */}
						<div className="p-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
							<div className="flex space-x-2">
								<Input
									placeholder="Type a message..."
									className="flex-1 bg-gray-200 dark:bg-gray-900"
									id="messageInput"
									value={sendMsg}
									onChange={(e) => setSendMsg(e.target.value)}
									onKeyDown={(e) => {
										if (
											e.key === "Enter" &&
											!loading &&
											sendMsg.trim()
										) {
											handleSendMsg();
										}
									}}
								/>
								<Button
									size="icon"
									disabled={loading || !sendMsg.trim()}
									onClick={handleSendMsg}
								>
									<Send className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
						<p className="text-gray-500 dark:text-gray-400">
							Select a conversation to start messaging
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatLayout;
