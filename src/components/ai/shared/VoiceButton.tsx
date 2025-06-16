
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface VoiceButtonProps {
  isListening: boolean;
  disabled?: boolean;
  onStart: () => void;
  onStop: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const VoiceButton = ({ 
  isListening, 
  disabled, 
  onStart, 
  onStop, 
  size = "icon",
  className = "" 
}: VoiceButtonProps) => {
  return (
    <Button
      onClick={isListening ? onStop : onStart}
      variant="outline"
      size={size}
      className={`${isListening ? 'bg-red-100' : ''} ${className}`}
      disabled={disabled}
    >
      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  );
};
