import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext.tsx";
import { toast } from "sonner";
import axios from "axios";

// Rest of the code remains exactly the same...
const ContactCard = ({
	name = "User",
	status = "offline",
	lastMessage = "",
	lastSeen = "a moment ago",
	avatarUrl = "/api/placeholder/32/32",
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
					<AvatarImage src={avatarUrl} alt={name} />
					<AvatarFallback>
						{name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>
				<div
					className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
						status === "online" ? "bg-green-500" : "bg-gray-400"
					}`}
				/>
			</div>

			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
						{name}
					</h3>
					<span className="text-xs text-gray-500 dark:text-gray-400">
						{lastSeen}
					</span>
				</div>
				<p className="text-sm text-gray-500 dark:text-gray-400 truncate">
					{lastMessage}
				</p>
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
	const { searchQuery } = useAuthContext();

	const filteredConversations = conversations.filter(
		(chat: any) =>
			chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="flex flex-col h-full">
			{/* Conversation List */}
			<ScrollArea className="flex-1">
				<div className="divide-y divide-gray-200 dark:divide-gray-700">
					{filteredConversations.length > 0 ? (
						filteredConversations.map((chat: any) => (
							<ContactCard
								key={chat.id}
								{...chat}
								isSelected={selectedId === chat.id}
								onClick={() => onSelect(chat)}
							/>
						))
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
	const [selectedChat, setSelectedChat] = useState<any | null>(null);
	const [isMobileListVisible, setIsMobileListVisible] = useState(true);

	// Sample data - you would typically fetch this from an API
	async () => {
		try {
			const res = await axios.get(
				"https://chatterz.onrender.com/api/conversations",
				{
					withCredentials: true,
				}
			);
			console.log("data", res.data);

			return res.data;
		} catch (error: any) {
			toast.error(error.response?.data || "Something went wrong!");
			return false;
		} finally {
		}
	};

	const conversations = [
		{
			id: 1,
			name: "Jane Cooper",
			status: "online",
			lastMessage: "Hey, how are you?",
			lastSeen: "2m ago",
			messages: [
				{ id: 1, text: "Hey, how are you?", sent: false },
				{ id: 2, text: "I'm good, thanks! How about you?", sent: true },
			],
		},
		{
			id: 2,
			name: "Alex Thompson",
			status: "offline",
			lastMessage: "Thanks for the update!",
			lastSeen: "1h ago",
			messages: [
				{ id: 1, text: "Did you get the files?", sent: false },
				{ id: 2, text: "Yes, thanks for the update!", sent: true },
			],
		},
		{
			id: 3,
			name: "Sarah Wilson",
			status: "online",
			lastMessage: "Meeting at 3 PM",
			lastSeen: "30m ago",
			messages: [
				{ id: 1, text: "Can we schedule a meeting?", sent: false },
				{ id: 2, text: "Sure, how about 3 PM?", sent: true },
			],
		},
		{
			id: 4,
			name: "Mike Johnson",
			status: "offline",
			lastMessage: "Project deadline updated",
			lastSeen: "1d ago",
			messages: [
				{
					id: 1,
					text: "Project deadline has been extended",
					sent: false,
				},
				{ id: 2, text: "That's great news!", sent: true },
			],
		},
	];

	const handleChatSelect = (chat: any) => {
		setSelectedChat(chat);
		setIsMobileListVisible(false);
	};

	const handleBack = () => {
		setIsMobileListVisible(true);
		setSelectedChat(null);
	};

	return (
		<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100 dark:bg-gray-900">
			{/* Conversation List Panel */}
			<div
				className={`
        w-full md:w-80 md:flex-shrink-0 bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700
        ${isMobileListVisible ? "flex" : "hidden md:flex"} 
        flex-col
      `}
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
				className={`
        flex-1 flex flex-col
        ${!isMobileListVisible ? "flex" : "hidden md:flex"}
      `}
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
									{selectedChat.name}
								</h2>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{selectedChat.status === "online"
										? "Online"
										: "Offline"}
								</p>
							</div>
						</div>

						{/* Messages Area */}
						<ScrollArea className="flex-1 p-4 bg-gray-200 dark:bg-gray-900">
							{selectedChat.messages.map((message: any) => (
								<div
									key={message.id}
									className={`flex ${
										message.sent
											? "justify-end"
											: "justify-start"
									} mb-4`}
								>
									<div
										className={`
                    max-w-[70%] p-3 rounded-lg
                    ${
						message.sent
							? "bg-white text-gray-700 dark:bg-gray-700 dark:text-white"
							: "bg-gray-700 text-white dark:bg-white dark:text-gray-700"
					}
                  `}
									>
										{message.text}
									</div>
								</div>
							))}
						</ScrollArea>

						{/* Message Input */}
						<div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
							<div className="flex space-x-2">
								<Input
									placeholder="Type a message..."
									className="flex-1 bg-gray-200 dark:bg-gray-900"
								/>
								<Button size="icon">
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
