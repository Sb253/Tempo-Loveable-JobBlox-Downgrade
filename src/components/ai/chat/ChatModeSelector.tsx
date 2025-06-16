
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { chatModes } from "@/types/chatConstants";

interface ChatModeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  isFloating?: boolean;
}

export const ChatModeSelector = ({ value, onChange, isFloating = false }: ChatModeSelectorProps) => {
  const triggerClass = isFloating ? "h-7 text-xs" : "w-48";

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={triggerClass}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {chatModes.map((mode) => (
          <SelectItem key={mode.value} value={mode.value} className={isFloating ? "text-xs" : ""}>
            {mode.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
