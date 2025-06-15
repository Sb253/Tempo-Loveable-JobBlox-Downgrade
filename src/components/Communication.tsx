
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Users, 
  Phone, 
  Video, 
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  MoreVertical,
  Paperclip,
  Smile,
  User,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'email' | 'sms' | 'call' | 'meeting';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  isCurrentUser: boolean;
}

interface Contact {
  id: string;
  name: string;
  type: 'customer' | 'team' | 'subcontractor';
  phone?: string;
  email?: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  lastSeen?: string;
  unreadCount: number;
  avatar?: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    type: 'customer',
    phone: '(555) 123-4567',
    email: 'john@example.com',
    status: 'offline',
    lastSeen: '2 hours ago',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Mike Johnson',
    type: 'team',
    phone: '(555) 234-5678',
    email: 'mike@company.com',
    status: 'online',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Sarah Davis',
    type: 'team',
    phone: '(555) 345-6789',
    email: 'sarah@company.com',
    status: 'busy',
    unreadCount: 1
  },
  {
    id: '4',
    name: 'ABC Electrical',
    type: 'subcontractor',
    phone: '(555) 456-7890',
    email: 'contact@abcelectrical.com',
    status: 'offline',
    lastSeen: '1 day ago',
    unreadCount: 0
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'John Smith',
    content: 'Hi, I wanted to follow up on the kitchen renovation project. When can we expect the team to arrive?',
    timestamp: '10:30 AM',
    type: 'text',
    status: 'read',
    isCurrentUser: false
  },
  {
    id: '2',
    senderId: 'current-user',
    senderName: 'You',
    content: 'Good morning John! Our team will arrive tomorrow at 8:00 AM. We\'ll call you 30 minutes before arrival.',
    timestamp: '10:35 AM',
    type: 'text',
    status: 'delivered',
    isCurrentUser: true
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'Mike Johnson',
    content: 'Kitchen renovation materials have arrived. Ready to start tomorrow.',
    timestamp: '11:15 AM',
    type: 'text',
    status: 'read',
    isCurrentUser: false
  }
];

export const Communication = () => {
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [contacts] = useState<Contact[]>(mockContacts);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-3 w-3" />;
      case 'sms': return <MessageSquare className="h-3 w-3" />;
      case 'call': return <Phone className="h-3 w-3" />;
      case 'meeting': return <Video className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="h-3 w-3 text-blue-500" />;
      case 'read': return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case 'failed': return <AlertCircle className="h-3 w-3 text-red-500" />;
      default: return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'sent',
      isCurrentUser: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been delivered.",
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedContactData = contacts.find(c => c.id === selectedContact);
  const contactMessages = messages.filter(m => 
    m.senderId === selectedContactData?.name || m.senderId === 'current-user'
  );

  const handleCall = (contact: Contact) => {
    toast({
      title: "Calling...",
      description: `Initiating call to ${contact.name}`,
    });
  };

  const handleVideoCall = (contact: Contact) => {
    toast({
      title: "Video Call",
      description: `Starting video call with ${contact.name}`,
    });
  };

  const handleScheduleMeeting = (contact: Contact) => {
    toast({
      title: "Schedule Meeting",
      description: `Opening calendar to schedule with ${contact.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Communication Center</h1>
          <p className="text-muted-foreground">Manage all your communications in one place</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            New Call
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            New Email
          </Button>
          <Button className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-xs text-muted-foreground">Active contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.reduce((total, contact) => total + contact.unreadCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.status === 'online').length}
            </div>
            <p className="text-xs text-muted-foreground">Available contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">Sent and received</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Communication Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Contacts List */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[450px]">
                  {filteredContacts.map((contact, index) => (
                    <div key={contact.id}>
                      <div
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                          selectedContact === contact.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedContact(contact.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback>
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{contact.name}</p>
                              <Badge variant="outline" className="text-xs capitalize">
                                {contact.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {contact.status === 'online' ? 'Online' : contact.lastSeen}
                            </p>
                          </div>
                          {contact.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {index < filteredContacts.length - 1 && <Separator />}
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Messages Area */}
            <Card className="lg:col-span-2">
              {selectedContactData && (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>
                              {selectedContactData.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedContactData.status)}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{selectedContactData.name}</CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">
                            {selectedContactData.type} • {selectedContactData.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCall(selectedContactData)}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVideoCall(selectedContactData)}
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleScheduleMeeting(selectedContactData)}
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[450px]">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {contactMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="flex items-end gap-2 max-w-[80%]">
                              {!message.isCurrentUser && (
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {message.senderName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={`rounded-lg p-3 ${
                                  message.isCurrentUser
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <div className={`flex items-center justify-between gap-2 mt-1 ${
                                  message.isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                }`}>
                                  <div className="flex items-center gap-1">
                                    {getTypeIcon(message.type)}
                                    <span className="text-xs">{message.timestamp}</span>
                                  </div>
                                  {message.isCurrentUser && getStatusIcon(message.status)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
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
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <Badge variant="outline" className="text-xs capitalize mb-1">
                          {contact.type}
                        </Badge>
                        {contact.phone && (
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        )}
                        {contact.email && (
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {message.senderName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{message.senderName}</p>
                          <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(message.type)}
                        {getStatusIcon(message.status)}
                      </div>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
