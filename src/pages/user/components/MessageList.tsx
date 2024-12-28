// components/chat/MessageList.tsx
import { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  _id: string;
  message: string;
  senderID: string;
}

interface MessageListProps {
  messages: Message[];
  currentUserID: string;
}

const MessageList = ({ messages, currentUserID }: MessageListProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4 bg-gray-200 dark:bg-gray-900 h-[calc(100dvh_-_8rem)] md:h-auto">
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`flex ${
              message.senderID === currentUserID
                ? "justify-end"
                : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.senderID === currentUserID
                  ? "bg-white text-gray-700 dark:bg-gray-700 dark:text-white"
                  : "bg-gray-700 text-white dark:bg-white dark:text-gray-700"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;