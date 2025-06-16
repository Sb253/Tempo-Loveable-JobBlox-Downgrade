
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { VoiceButton } from "@/components/ai/shared/VoiceButton";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  isListening: boolean;
  onVoiceStart: () => void;
  onVoiceStop: () => void;
  isVoiceSupported: boolean;
  isFloating?: boolean;
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onSend, 
  isLoading, 
  isListening, 
  onVoiceStart, 
  onVoiceStop, 
  isVoiceSupported,
  isFloating = false 
}: ChatInputProps) => {
  const inputSize = isFloating ? "text-xs" : "";
  const buttonSize = isFloating ? "h-8 w-8" : undefined;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Ask me anything..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className={inputSize}
        disabled={isLoading}
      />
      {isVoiceSupported && (
        <VoiceButton
          isListening={isListening}
          onStart={onVoiceStart}
          onStop={onVoiceStop}
          disabled={isLoading}
          size={isFloating ? "icon" : "icon"}
          className={isFloating ? "h-8 w-8" : ""}
        />
      )}
      <Button
        onClick={onSend}
        disabled={!value.trim() || isLoading}
        size={isFloating ? "icon" : "default"}
        className={buttonSize}
      >
        <Send className={isFloating ? "h-3 w-3" : "h-4 w-4"} />
      </Button>
    </div>
  );
};
