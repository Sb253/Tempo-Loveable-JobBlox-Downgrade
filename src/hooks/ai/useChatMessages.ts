
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { aiService, type ChatMessage } from "@/services/aiService";

export const useChatMessages = (currentContext: string) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your enhanced JobBlox AI assistant. I can help you with job management, customer relations, document generation, and business insights. How can I assist you today?',
      role: 'assistant',
      timestamp: new Date(),
      context: currentContext
    }
  ]);

  const sendMessage = async (content: string, selectedMode: string, isVoiceEnabled: boolean) => {
    if (!aiService.isConfigured()) {
      toast({
        title: "AI Not Configured",
        description: "Please configure your AI settings in the AI Settings page.",
        variant: "destructive"
      });
      return false;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      context: currentContext
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const contextWithMode = `${currentContext}-${selectedMode}`;
      const aiResponse = await aiService.sendChatMessage(content, contextWithMode);
      setMessages(prev => [...prev, aiResponse]);

      // Text-to-speech for AI responses if enabled
      if (isVoiceEnabled) {
        try {
          const audioBlob = await aiService.synthesizeVoice({ text: aiResponse.content });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
        } catch (voiceError) {
          console.error('Voice synthesis failed:', voiceError);
        }
      }

      return true;
    } catch (error) {
      toast({
        title: "AI Error",
        description: error instanceof Error ? error.message : "Failed to get AI response",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    messages,
    sendMessage
  };
};
