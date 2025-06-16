
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  context: string;
}

export interface EnhancedAIChatAssistantProps {
  isFloating?: boolean;
  currentContext?: string;
  onContextChange?: (context: string) => void;
}

export interface ChatMode {
  value: string;
  label: string;
}
