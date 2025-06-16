
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2, Mic, MicOff, Volume2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiService, type ChatMessage } from "@/services/aiService";

interface EnhancedAIChatAssistantProps {
  isFloating?: boolean;
  currentContext?: string;
  onContextChange?: (context: string) => void;
}

export const EnhancedAIChatAssistant = ({ 
  isFloating = true, 
  currentContext = 'dashboard',
  onContextChange 
}: EnhancedAIChatAssistantProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your enhanced JobBlox AI assistant. I can help you with job management, customer relations, document generation, and business insights. How can I assist you today?',
      role: 'assistant',
      timestamp: new Date(),
      context: currentContext
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedMode, setSelectedMode] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const chatModes = [
    { value: 'general', label: 'General Assistant' },
    { value: 'job-manager', label: 'Job Manager' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'financial-advisor', label: 'Financial Advisor' },
    { value: 'field-supervisor', label: 'Field Supervisor' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsVoiceEnabled(aiService.isVoiceEnabled());
    initializeSpeechRecognition();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNewMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    if (!aiService.isConfigured()) {
      toast({
        title: "AI Not Configured",
        description: "Please configure your AI settings in the AI Settings page.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      role: 'user',
      timestamp: new Date(),
      context: currentContext
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const contextWithMode = `${currentContext}-${selectedMode}`;
      const aiResponse = await aiService.sendChatMessage(newMessage, contextWithMode);
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

    } catch (error) {
      toast({
        title: "AI Error",
        description: error instanceof Error ? error.message : "Failed to get AI response",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    const modeInfo = chatModes.find(m => m.value === mode);
    if (modeInfo) {
      toast({
        title: "Mode Changed",
        description: `Switched to ${modeInfo.label} mode`,
      });
    }
  };

  if (isFloating) {
    return (
      <>
        {/* Floating Chat Button */}
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}

        {/* Floating Chat Window */}
        {isOpen && (
          <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 border-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Bot className="h-4 w-4" />
                  Enhanced AI Assistant
                  <Badge variant="secondary" className="text-xs">GPT-4</Badge>
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {!isMinimized && (
                <div className="flex items-center gap-2 mt-2">
                  <Select value={selectedMode} onValueChange={handleModeChange}>
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chatModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value} className="text-xs">
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isVoiceEnabled && (
                    <Volume2 className="h-3 w-3 text-green-500" title="Voice enabled" />
                  )}
                </div>
              )}
            </CardHeader>
            
            {!isMinimized && (
              <CardContent className="flex flex-col h-96 p-4">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            message.role === 'user' ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            {message.role === 'user' ? <User className="h-3 w-3 text-white" /> : <Bot className="h-3 w-3" />}
                          </div>
                          <div className={`rounded-lg p-2 text-xs ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <Bot className="h-3 w-3" />
                          </div>
                          <div className="bg-muted rounded-lg p-2">
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                              <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="text-xs"
                    disabled={isLoading}
                  />
                  {recognitionRef.current && (
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      variant="outline"
                      size="icon"
                      className={`h-8 w-8 ${isListening ? 'bg-red-100' : ''}`}
                      disabled={isLoading}
                    >
                      {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                    </Button>
                  )}
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isLoading}
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        )}
      </>
    );
  }

  // Full-page version similar to floating but larger
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Enhanced AI Assistant
            <Badge variant="secondary">GPT-4</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedMode} onValueChange={handleModeChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {chatModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-96">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {message.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          {recognitionRef.current && (
            <Button
              onClick={isListening ? stopListening : startListening}
              variant="outline"
              size="icon"
              className={isListening ? 'bg-red-100' : ''}
              disabled={isLoading}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
