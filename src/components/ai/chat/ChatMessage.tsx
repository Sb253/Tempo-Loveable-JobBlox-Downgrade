
import { Bot, User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/chatTypes";

interface ChatMessageProps {
  message: ChatMessageType;
  isFloating?: boolean;
}

export const ChatMessage = ({ message, isFloating = false }: ChatMessageProps) => {
  const iconSize = isFloating ? "h-3 w-3" : "h-4 w-4";
  const avatarSize = isFloating ? "w-6 h-6" : "w-8 h-8";
  const padding = isFloating ? "p-2" : "p-3";
  const textSize = isFloating ? "text-xs" : "";

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-${isFloating ? '2' : '3'} max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`${avatarSize} rounded-full flex items-center justify-center ${
          message.role === 'user' ? 'bg-primary' : 'bg-secondary'
        }`}>
          {message.role === 'user' ? 
            <User className={`${iconSize} text-white`} /> : 
            <Bot className={iconSize} />
          }
        </div>
        <div className={`rounded-lg ${padding} ${textSize} ${
          message.role === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};
