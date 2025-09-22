import { useState, useEffect } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, User, Phone, Search, Menu, Phone as PhoneIcon, Video, MoreVertical, Paperclip, Smile, ArrowRight, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface MessagesAppProps {
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline?: boolean;
}

// Mock data for chat list
const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Telegram Messages',
    avatar: 'https://telegram.org/img/t_logo.png',
    lastMessage: 'Access your Telegram messages',
    timestamp: 'Now',
    unreadCount: 0,
    isOnline: true
  },
  {
    id: '2',
    name: 'Project Team',
    avatar: '/placeholder.svg',
    lastMessage: 'Weekly sync tomorrow at 10am',
    timestamp: 'Yesterday',
    unreadCount: 2
  },
  {
    id: '3',
    name: 'Family Group',
    avatar: '/placeholder.svg',
    lastMessage: 'Dinner plans this weekend?',
    timestamp: '2d ago',
    unreadCount: 0
  },
  {
    id: '4',
    name: 'Developer Community',
    avatar: '/placeholder.svg',
    lastMessage: 'React 19 is out!',
    timestamp: '3d ago',
    unreadCount: 5
  }
];

// Mock data for messages
const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Welcome to the Messages app!',
    sender: 'contact',
    timestamp: '10:30 AM',
    isRead: true
  },
  {
    id: '2',
    content: 'You can access your actual Telegram messages by clicking the link below.',
    sender: 'contact',
    timestamp: '10:31 AM',
    isRead: true
  },
  {
    id: '3',
    content: 'Got it, thanks!',
    sender: 'user',
    timestamp: '10:32 AM',
    isRead: true
  },
  {
    id: '4',
    content: 'This will open your Telegram profile in a new browser window.',
    sender: 'contact',
    timestamp: '10:33 AM',
    isRead: false
  }
];

export const MessagesApp = ({ onBack }: MessagesAppProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isInChat, setIsInChat] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const openTelegram = () => {
    window.open('https://t.me/cosmic36', '_blank');
  };

  const renderChatList = () => (
    <div className="space-y-1">
      {isLoading ? (
        Array(4).fill(0).map((_, index) => (
          <div key={index} className="p-4 flex items-center space-x-3 border-b border-border/20">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
            </div>
            <Skeleton className="h-3 w-10" />
          </div>
        ))
      ) : (
        mockChats.map(chat => (
          <div 
            key={chat.id} 
            className={`p-4 flex items-center space-x-3 border-b border-border/20 cursor-pointer hover:bg-secondary/10 transition-colors ${selectedChat?.id === chat.id ? 'bg-secondary/20' : ''}`}
            onClick={() => {
              setSelectedChat(chat);
              setIsInChat(true);
            }}
          >
            <div className="relative">
              <img 
                src={chat.avatar} 
                alt={chat.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.isOnline && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="font-medium truncate">{chat.name}</h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            {chat.unreadCount > 0 && (
              <span className="bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                {chat.unreadCount}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderChatInterface = () => (
    selectedChat ? (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3" onClick={() => setIsInChat(false)}>
            {isInChat && <ArrowRight className="h-4 w-4 rotate-180" />}
            <div className="relative">
              <img 
                src={selectedChat.avatar} 
                alt={selectedChat.name} 
                className="w-9 h-9 rounded-full object-cover"
              />
              {selectedChat.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-background" />
              )}
            </div>
            <h3 className="font-medium">{selectedChat.name}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <PhoneIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-2`}>
                <Skeleton className={`h-8 rounded-2xl ${index % 2 === 0 ? 'w-3/4' : 'w-2/3'}`} />
              </div>
            ))
          ) : (
            messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${message.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-secondary/30 rounded-bl-none'}`}
                >
                  <p>{message.content}</p>
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Telegram Link Card */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-xl p-4 space-y-3">
            <h4 className="font-medium text-blue-700">Connect with Telegram</h4>
            <p className="text-sm text-muted-foreground">
              Click the button below to open your Telegram messages in a new browser window.
            </p>
            <Button 
              onClick={openTelegram}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Telegram
            </Button>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input 
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-10" // Space for emoji button
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a chat to begin
      </div>
    )
  );

  return (
    <MobileScreen title={isInChat ? (selectedChat?.name || "Messages") : "Messages"} onBack={onBack}>
      {/* Search Bar */}
      <div className="p-3 sticky top-0 z-10 bg-background border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search messages..."
            className="pl-10 bg-secondary/30 border-0"
          />
        </div>
      </div>

      {/* Main Content */}
      {!isInChat ? (
        <div className="h-full">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button 
              className={`flex-1 py-3 text-center font-medium ${activeTab === 'chats' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('chats')}
            >
              Chats
            </button>
            <button 
              className={`flex-1 py-3 text-center font-medium ${activeTab === 'contacts' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('contacts')}
            >
              Contacts
            </button>
          </div>

          {/* Chat List */}
          <div className="h-[calc(100%-56px)] overflow-y-auto">
            {activeTab === 'chats' ? renderChatList() : (
              <div className="p-6 text-center text-muted-foreground">
                Contact list will sync with Telegram
              </div>
            )}
          </div>
        </div>
      ) : (
        renderChatInterface()
      )}
    </MobileScreen>
  );
};