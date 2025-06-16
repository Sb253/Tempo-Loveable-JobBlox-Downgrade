
import { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { aiService } from "@/services/aiService";

// Custom hooks
import { useChatState } from "@/hooks/ai/useChatState";
import { useVoiceRecognition } from "@/hooks/ai/useVoiceRecognition";
import { useChatMessages } from "@/hooks/ai/useChatMessages";

// Components
import { ChatMessage } from "@/components/ai/chat/ChatMessage";
import { ChatInput } from "@/components/ai/chat/ChatInput";
import { ChatHeader } from "@/components/ai/chat/ChatHeader";
import { FloatingChatButton } from "@/components/ai/chat/FloatingChatButton";
import { LoadingDots } from "@/components/ai/shared/LoadingDots";

// Types
import { EnhancedAIChatAssistantProps } from "@/types/chatTypes";

export const EnhancedAIChatAssistant = ({ 
  isFloating = true, 
  currentContext = 'dashboard',
  onContextChange 
}: EnhancedAIChatAssistantProps) => {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Custom hooks
  const { 
    isOpen, 
    setIsOpen, 
    isMinimized, 
    setIsMinimized, 
    isLoading, 
    setIsLoading, 
    selectedMode, 
    setSelectedMode 
  } = useChatState();

  const { 
    isListening, 
    startListening, 
    stopListening, 
    isSupported: isVoiceSupported 
  } = useVoiceRecognition();

  const { messages, sendMessage } = useChatMessages(currentContext);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setIsVoiceEnabled(aiService.isVoiceEnabled());
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    const success = await sendMessage(newMessage, selectedMode, isVoiceEnabled);
    setIsLoading(false);
    
    if (success) {
      setNewMessage('');
    }
  };

  const handleVoiceStart = () => {
    startListening((transcript) => {
      setNewMessage(transcript);
    });
  };

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    const modeInfo = require("@/types/chatConstants").chatModes.find((m: any) => m.value === mode);
    if (modeInfo) {
      toast({
        title: "Mode Changed",
        description: `Switched to ${modeInfo.label} mode`,
      });
    }
  };

  if (isFloating) {
    return (
      <TooltipProvider>
        {/* Floating Chat Button */}
        {!isOpen && (
          <FloatingChatButton onClick={() => setIsOpen(true)} />
        )}

        {/* Floating Chat Window */}
        {isOpen && (
          <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 border-2">
            <CardHeader className="pb-2">
              <ChatHeader
                isMinimized={isMinimized}
                onToggleMinimize={() => setIsMinimized(!isMinimized)}
                onClose={() => setIsOpen(false)}
                selectedMode={selectedMode}
                onModeChange={handleModeChange}
                isVoiceEnabled={isVoiceEnabled}
                isFloating={true}
              />
            </CardHeader>
            
            {!isMinimized && (
              <CardContent className="flex flex-col h-96 p-4">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <ChatMessage 
                        key={message.id} 
                        message={message} 
                        isFloating={true}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <LoadingDots />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <ChatInput
                  value={newMessage}
                  onChange={setNewMessage}
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                  isListening={isListening}
                  onVoiceStart={handleVoiceStart}
                  onVoiceStop={stopListening}
                  isVoiceSupported={isVoiceSupported}
                  isFloating={true}
                />
              </CardContent>
            )}
          </Card>
        )}
      </TooltipProvider>
    );
  }

  // Full-page version
  return (
    <TooltipProvider>
      <Card className="w-full h-full">
        <CardHeader>
          <ChatHeader
            isMinimized={false}
            onToggleMinimize={() => {}}
            onClose={() => {}}
            selectedMode={selectedMode}
            onModeChange={handleModeChange}
            isVoiceEnabled={isVoiceEnabled}
            isFloating={false}
          />
        </CardHeader>
        <CardContent className="flex flex-col h-96">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isFloating={false}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <ChatInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={handleSendMessage}
            isLoading={isLoading}
            isListening={isListening}
            onVoiceStart={handleVoiceStart}
            onVoiceStop={stopListening}
            isVoiceSupported={isVoiceSupported}
            isFloating={false}
          />
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
