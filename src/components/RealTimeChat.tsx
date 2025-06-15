import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Users, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  MoreVertical,
  MapPin,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'location' | 'photo' | 'urgent';
  isRead: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  location?: string;
  currentJob?: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    role: 'Lead Technician',
    status: 'online',
    location: 'Downtown Site',
    currentJob: 'Kitchen Renovation'
  },
  {
    id: '2',
    name: 'Sarah Davis',
    role: 'Project Manager',
    status: 'online',
    location: 'Office',
    currentJob: 'Multiple Projects'
  },
  {
    id: '3',
    name: 'Tom Wilson',
    role: 'Electrician',
    status: 'busy',
    location: 'Residential Site',
    currentJob: 'Wiring Installation'
  },
  {
    id: '4',
    name: 'Lisa Chen',
    role: 'Plumber',
    status: 'away',
    location: 'Commercial Site',
    currentJob: 'Pipe Repair'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Mike Johnson',
    content: 'Kitchen renovation is 80% complete. Need to discuss the final electrical work.',
    timestamp: '10:30 AM',
    type: 'text',
    isRead: true
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Sarah Davis',
    content: 'Great progress! Tom, can you check the electrical requirements?',
    timestamp: '10:32 AM',
    type: 'text',
    isRead: true
  },
  {
    id: '3',
    senderId: '3',
    senderName: 'Tom Wilson',
    content: 'On my way to the site. ETA 15 minutes.',
    timestamp: '10:35 AM',
    type: 'location',
    isRead: false
  },
  {
    id: '4',
    senderId: '1',
    senderName: 'Mike Johnson',
    content: 'URGENT: Water leak detected in basement. Need immediate assistance!',
    timestamp: '10:45 AM',
    type: 'urgent',
    isRead: false
  }
];

export const RealTimeChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      isRead: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    toast({
      title: "Message Sent",
      description: "Your message has been delivered to the team.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'location': return <MapPin className="h-3 w-3" />;
      case 'urgent': return <AlertCircle className="h-3 w-3 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-[600px] bg-background">
      {/* Team Members Sidebar */}
      <div className="w-80 border-r">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team ({teamMembers.filter(m => m.status === 'online').length} online)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-2 p-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                      {member.location && (
                        <p className="text-xs text-blue-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {member.location}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold capitalize"># {selectedChannel}</h3>
            <p className="text-sm text-muted-foreground">{teamMembers.length} members</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'urgent' ? 'bg-red-50 p-2 rounded-lg' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {message.senderName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{message.senderName}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    {getMessageIcon(message.type)}
                  </div>
                  <p className={`text-sm ${message.type === 'urgent' ? 'font-medium text-red-700' : ''}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
