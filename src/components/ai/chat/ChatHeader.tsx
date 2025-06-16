
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, X, Minimize2, Maximize2, Volume2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { AIBadge } from "@/components/ai/shared/AIBadge";
import { ChatModeSelector } from "./ChatModeSelector";

interface ChatHeaderProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  selectedMode: string;
  onModeChange: (mode: string) => void;
  isVoiceEnabled: boolean;
  isFloating?: boolean;
}

export const ChatHeader = ({ 
  isMinimized, 
  onToggleMinimize, 
  onClose, 
  selectedMode, 
  onModeChange, 
  isVoiceEnabled,
  isFloating = false 
}: ChatHeaderProps) => {
  if (isFloating) {
    return (
      <TooltipProvider>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bot className="h-4 w-4" />
            Enhanced AI Assistant
            <AIBadge />
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onToggleMinimize}
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onClose}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {!isMinimized && (
          <div className="flex items-center gap-2 mt-2">
            <ChatModeSelector 
              value={selectedMode} 
              onChange={onModeChange} 
              isFloating={isFloating}
            />
            {isVoiceEnabled && (
              <Tooltip>
                <TooltipTrigger>
                  <Volume2 className="h-3 w-3 text-green-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice enabled</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center gap-2">
        <Bot className="h-5 w-5" />
        Enhanced AI Assistant
        <AIBadge />
      </CardTitle>
      <div className="flex items-center gap-2">
        <ChatModeSelector 
          value={selectedMode} 
          onChange={onModeChange} 
          isFloating={isFloating}
        />
      </div>
    </div>
  );
};
