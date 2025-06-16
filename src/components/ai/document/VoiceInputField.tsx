
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VoiceButton } from "@/components/ai/shared/VoiceButton";

interface VoiceInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isListening: boolean;
  onVoiceStart: () => void;
  onVoiceStop: () => void;
  isTextarea?: boolean;
  rows?: number;
}

export const VoiceInputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  isListening, 
  onVoiceStart, 
  onVoiceStop,
  isTextarea = false,
  rows = 2
}: VoiceInputFieldProps) => {
  const InputComponent = isTextarea ? Textarea : Input;
  const inputProps = isTextarea ? { rows } : {};

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <InputComponent
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          {...inputProps}
        />
        <VoiceButton
          isListening={isListening}
          onStart={onVoiceStart}
          onStop={onVoiceStop}
        />
      </div>
    </div>
  );
};
