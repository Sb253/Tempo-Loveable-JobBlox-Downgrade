
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessDataManager } from '../utils/businessDataManager';
import { MessageCircle, Send, Users, Phone, Video, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  chatRoomId: string;
  sender: string;
  senderId: string;
  message: string;
  timestamp: string;
  messageType: 'text' | 'file' | 'image' | 'location';
  fileUrl?: string;
  fileName?: string;
  isCurrentUser: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'job';
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'busy';
  jobId?: string;
  createdAt: string;
}

export const EmployeeChat = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
  const [showCreateDirectDialog, setShowCreateDirectDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroup, setNewGroup] = useState({
    name: '',
    participants: [] as string[],
    type: 'group' as const,
    jobId: ''
  });
  const [newDirectChat, setNewDirectChat] = useState({
    participantId: ''
  });

  const employees = businessDataManager.getAllEmployees();
  const jobs = businessDataManager.getAllJobs();
  const currentUserId = 'current-user';
  const currentUserName = 'You';

  useEffect(() => {
    loadChatRooms();
    loadMessages();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadMessages();
      markAsRead(selectedChat);
    }
  }, [selectedChat]);

  const loadChatRooms = () => {
    const data = businessDataManager.getAllChatRooms();
    setChatRooms(data);
  };

  const loadMessages = () => {
    const data = businessDataManager.getAllChatMessages();
    const filteredMessages = selectedChat 
      ? data.filter(msg => msg.chatRoomId === selectedChat)
      : [];
    setMessages(filteredMessages);
  };

  const markAsRead = (chatRoomId: string) => {
    const room = chatRooms.find(r => r.id === chatRoomId);
    if (room && room.unreadCount > 0) {
      const updatedRoom = { ...room, unreadCount: 0 };
      businessDataManager.saveChatRoom(updatedRoom);
      loadChatRooms();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatRoomId: selectedChat,
      sender: currentUserName,
      senderId: currentUserId,
      message: newMessage,
      timestamp: new Date().toISOString(),
      messageType: 'text',
      isCurrentUser: true
    };

    businessDataManager.createChatMessage(message);

    // Update chat room last message
    const room = chatRooms.find(r => r.id === selectedChat);
    if (room) {
      const updatedRoom = {
        ...room,
        lastMessage: newMessage,
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      businessDataManager.saveChatRoom(updatedRoom);
    }

    loadMessages();
    loadChatRooms();
    setNewMessage('');

    toast({
      title: "Message Sent",
      description: "Your message has been delivered.",
    });
  };

  const handleCreateGroup = () => {
    if (!newGroup.name || newGroup.participants.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const participantNames = newGroup.participants.map(id => {
      const emp = employees.find(e => e.id === id);
      return emp ? emp.name : 'Unknown';
    });

    const job = newGroup.jobId ? jobs.find(j => j.id === newGroup.jobId) : null;

    const chatRoom: ChatRoom = {
      id: `chat-${Date.now()}`,
      name: job ? `${newGroup.name} (${job.title})` : newGroup.name,
      type: newGroup.jobId ? 'job' : 'group',
      participants: [...newGroup.participants, currentUserId],
      participantNames: [...participantNames, currentUserName],
      lastMessage: 'Group created',
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCount: 0,
      status: 'online',
      jobId: newGroup.jobId || undefined,
      createdAt: new Date().toISOString()
    };

    businessDataManager.createChatRoom(chatRoom);
    loadChatRooms();
    setShowCreateGroupDialog(false);
    setNewGroup({
      name: '',
      participants: [],
      type: 'group',
      jobId: ''
    });

    toast({
      title: "Group Created",
      description: `${chatRoom.name} has been created`
    });
  };

  const handleCreateDirectChat = () => {
    if (!newDirectChat.participantId) {
      toast({
        title: "Validation Error",
        description: "Please select an employee",
        variant: "destructive"
      });
      return;
    }

    const employee = employees.find(e => e.id === newDirectChat.participantId);
    if (!employee) return;

    // Check if direct chat already exists
    const existingChat = chatRooms.find(room => 
      room.type === 'direct' && 
      room.participants.includes(newDirectChat.participantId) &&
      room.participants.includes(currentUserId)
    );

    if (existingChat) {
      setSelectedChat(existingChat.id);
      setShowCreateDirectDialog(false);
      toast({
        title: "Chat Opened",
        description: `Opened existing chat with ${employee.name}`
      });
      return;
    }

    const chatRoom: ChatRoom = {
      id: `chat-${Date.now()}`,
      name: employee.name,
      type: 'direct',
      participants: [newDirectChat.participantId, currentUserId],
      participantNames: [employee.name, currentUserName],
      lastMessage: 'Chat started',
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCount: 0,
      status: 'online',
      createdAt: new Date().toISOString()
    };

    businessDataManager.createChatRoom(chatRoom);
    loadChatRooms();
    setSelectedChat(chatRoom.id);
    setShowCreateDirectDialog(false);
    setNewDirectChat({ participantId: '' });

    toast({
      title: "Chat Created",
      description: `Started chat with ${employee.name}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.participantNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedChatRoom = chatRooms.find(room => room.id === selectedChat);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Chat</h2>
        <div className="flex gap-2">
          <Dialog open={showCreateGroupDialog} onOpenChange={setShowCreateGroupDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                New Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Group Name *</Label>
                  <Input
                    value={newGroup.name}
                    onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter group name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Job (Optional)</Label>
                  <Select value={newGroup.jobId} onValueChange={(value) => setNewGroup(prev => ({ ...prev, jobId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select related job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific job</SelectItem>
                      {jobs.map(job => (
                        <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Participants *</Label>
                  <div className="space-y-2">
                    {employees.map(emp => (
                      <div key={emp.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={emp.id}
                          checked={newGroup.participants.includes(emp.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewGroup(prev => ({ ...prev, participants: [...prev.participants, emp.id] }));
                            } else {
                              setNewGroup(prev => ({ ...prev, participants: prev.participants.filter(id => id !== emp.id) }));
                            }
                          }}
                        />
                        <label htmlFor={emp.id}>{emp.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateGroupDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGroup}>
                    Create Group
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateDirectDialog} onOpenChange={setShowCreateDirectDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                New Chat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start Direct Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Employee</Label>
                  <Select value={newDirectChat.participantId} onValueChange={(value) => setNewDirectChat({ participantId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose employee to chat with" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDirectDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateDirectChat}>
                    Start Chat
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
              {chatRooms.filter(room => room.type === 'group' || room.type === 'job').length}
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
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[450px]">
              {filteredChatRooms.map((room, index) => (
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
                            {room.type === 'group' || room.type === 'job' ? <Users className="h-4 w-4" /> : room.name.charAt(0)}
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
                        {room.type === 'job' && (
                          <Badge variant="outline" className="text-xs mt-1">Job Chat</Badge>
                        )}
                      </div>
                      {room.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {room.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {index < filteredChatRooms.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2">
          {selectedChatRoom ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedChatRoom.type === 'group' || selectedChatRoom.type === 'job' ? <Users className="h-4 w-4" /> : selectedChatRoom.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedChatRoom.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedChatRoom.type === 'group' || selectedChatRoom.type === 'job'
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
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a chat to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
