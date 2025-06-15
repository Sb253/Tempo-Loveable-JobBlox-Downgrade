
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, Users, Phone, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'job';
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'busy';
}

const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    type: 'direct',
    participants: ['Mike Johnson', 'You'],
    lastMessage: 'Heading to the kitchen renovation site now',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
    status: 'online'
  },
  {
    id: '2',
    name: 'Kitchen Team',
    type: 'group',
    participants: ['Mike Johnson', 'Sarah Davis', 'You'],
    lastMessage: 'Tools are ready for tomorrow',
    lastMessageTime: '9:45 AM',
    unreadCount: 0,
    status: 'online'
  },
  {
    id: '3',
    name: 'Sarah Davis',
    type: 'direct',
    participants: ['Sarah Davis', 'You'],
    lastMessage: 'Can you check the plumbing specs?',
    lastMessageTime: '8:20 AM',
    unreadCount: 1,
    status: 'busy'
  }
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Mike Johnson',
    message: 'Good morning! Ready for the kitchen renovation today?',
    timestamp: '8:00 AM',
    isCurrentUser: false
  },
  {
    id: '2',
    sender: 'You',
    message: 'Yes, all tools are loaded. ETA 15 minutes.',
    timestamp: '8:05 AM',
    isCurrentUser: true
  },
  {
    id: '3',
    sender: 'Mike Johnson',
    message: 'Perfect! Customer will be there to let us in.',
    timestamp: '8:07 AM',
    isCurrentUser: false
  },
  {
    id: '4',
    sender: 'Mike Johnson',
    message: 'Heading to the kitchen renovation site now',
    timestamp: '10:30 AM',
    isCurrentUser: false
  }
];

export const EmployeeChat = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [chatRooms] = useState<ChatRoom[]>(mockChatRooms);
  const [messages] = useState<ChatMessage[]>(mockMessages);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    console.log('Sending message:', newMessage);
    toast({
      title: "Message Sent",
      description: "Your message has been delivered.",
    });
    setNewMessage('');
  };

  const selectedChatRoom = chatRooms.find(room => room.id === selectedChat);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Chat</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            New Group
          </Button>
          <Button className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chatRooms.filter(room => room.status === 'online').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chatRooms.reduce((total, room) => total + room.unreadCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chatRooms.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group Chats</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chatRooms.filter(room => room.type === 'group').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {chatRooms.map((room, index) => (
                <div key={room.id}>
                  <div
                    className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                      selectedChat === room.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedChat(room.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>
                            {room.type === 'group' ? <Users className="h-4 w-4" /> : room.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {room.type === 'direct' && (
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(room.status)}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{room.name}</p>
                          <span className="text-xs text-muted-foreground">{room.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{room.lastMessage}</p>
                      </div>
                      {room.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {room.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {index < chatRooms.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2">
          {selectedChatRoom && (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedChatRoom.type === 'group' ? <Users className="h-4 w-4" /> : selectedChatRoom.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedChatRoom.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedChatRoom.type === 'group' 
                          ? `${selectedChatRoom.participants.length} members`
                          : selectedChatRoom.status
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-[450px]">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isCurrentUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {!message.isCurrentUser && (
                            <p className="font-medium text-sm mb-1">{message.sender}</p>
                          )}
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 pt-4 border-t">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
