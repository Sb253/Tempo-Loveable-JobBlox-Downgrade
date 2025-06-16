
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatAssistantProps {
  isFloating?: boolean;
  currentContext?: string;
}

export const AIChatAssistant = ({ isFloating = true, currentContext = 'dashboard' }: AIChatAssistantProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your JobBlox AI assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(newMessage, currentContext),
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string, context: string) => {
    const responses = {
      dashboard: [
        "Based on your dashboard data, I can see you have several active jobs. Would you like me to help prioritize them?",
        "I notice your revenue is trending upward. Let me analyze your profit margins for optimization suggestions.",
        "Your team efficiency looks good. Would you like me to generate a performance report?"
      ],
      jobs: [
        "I can help you create job estimates, assign team members, or track progress. What do you need?",
        "Looking at your job history, I can suggest optimal pricing for similar projects.",
        "Would you like me to generate a job completion checklist based on the project type?"
      ],
      customers: [
        "I can analyze customer satisfaction patterns and suggest follow-up strategies.",
        "Based on customer data, I can help you identify your most valuable clients.",
        "Would you like me to draft a follow-up email for recent customers?"
      ]
    };

    const contextResponses = responses[context as keyof typeof responses] || responses.dashboard;
    return contextResponses[Math.floor(Math.random() * contextResponses.length)];
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
          <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 border-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Bot className="h-4 w-4" />
                  AI Assistant
                  <Badge variant="secondary" className="text-xs">Beta</Badge>
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
            </CardHeader>
            
            {!isMinimized && (
              <CardContent className="flex flex-col h-80 p-4">
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

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
          <Badge variant="secondary">Beta</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-96">
        {/* Chat content similar to floating version */}
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
