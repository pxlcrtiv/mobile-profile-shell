import { useState } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { DynamicIsland } from '@/components/DynamicIsland';
import { AppIcon } from '@/components/AppIcon';
import { AboutApp } from '@/components/apps/AboutApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { SkillsApp } from '@/components/apps/SkillsApp';
import { ContactApp } from '@/components/apps/ContactApp';
import { GitHubApp } from '@/components/apps/GitHubApp';
import { CalculatorApp } from '@/components/apps/CalculatorApp';
import { ClockApp } from '@/components/apps/ClockApp';
import { WeatherApp } from '@/components/apps/WeatherApp';
import { SnakeGameApp } from '@/components/apps/SnakeGameApp';
import { TicTacToeApp } from '@/components/apps/TicTacToeApp';
import { SettingsApp } from '@/components/apps/SettingsApp';
import { QRCodeApp } from '@/components/apps/QRCodeApp';
import { MusicApp } from '@/components/apps/MusicApp';
import { MessagesApp } from '@/components/apps/MessagesApp';
import { 
  User, 
  FolderOpen, 
  Code, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  Settings, 
  Calculator,
  Clock,
  CloudSun,
  Gamepad2,
  Image,
  Music,
  MessageCircle,
  Camera
} from 'lucide-react';

type AppType = 'home' | 'about' | 'projects' | 'skills' | 'contact' | 'github' | 'calculator' | 'clock' | 'weather' | 'snake' | 'tictactoe' | 'settings' | 'photos' | 'music' | 'messages';

const Index = () => {
  const [currentApp, setCurrentApp] = useState<AppType | 'music' | 'messages'>('home');

  const apps = [
    // Core Portfolio Apps
  {
    id: 'about',
    label: 'About Me',
    icon: User,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    onClick: () => setCurrentApp('about')
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: Github,
    color: 'bg-gradient-to-br from-gray-700 to-gray-900',
    onClick: () => setCurrentApp('github')
  },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      onClick: () => setCurrentApp('projects'),
      badge: 4
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Code,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      onClick: () => setCurrentApp('skills')
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      onClick: () => setCurrentApp('contact')
    },
    
    // iOS Native Apps
    {
      id: 'calculator',
      label: 'Calculator',
      icon: Calculator,
      color: 'bg-gradient-to-br from-gray-700 to-gray-800',
      onClick: () => setCurrentApp('calculator')
    },
    {
      id: 'clock',
      label: 'Clock',
      icon: Clock,
      color: 'bg-gradient-to-br from-gray-900 to-black',
      onClick: () => setCurrentApp('clock')
    },
    {
      id: 'weather',
      label: 'Weather',
      icon: CloudSun,
      color: 'bg-gradient-to-br from-blue-400 to-blue-500',
      onClick: () => setCurrentApp('weather')
    },
    { 
      id: 'photos',
      label: 'QR Code',
      icon: Camera,
      color: 'bg-gradient-to-br from-blue-400 to-indigo-500',
      onClick: () => setCurrentApp('photos')
    },
    
    // Games
    {
      id: 'snake',
      label: 'Snake',
      icon: Gamepad2,
      color: 'bg-gradient-to-br from-green-400 to-green-500',
      onClick: () => setCurrentApp('snake')
    },
    {
      id: 'tictactoe',
      label: 'Tic Tac Toe',
      icon: Gamepad2,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      onClick: () => setCurrentApp('tictactoe')
    },
    
    // Settings & Social
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'bg-gradient-to-br from-gray-600 to-gray-700',
      onClick: () => setCurrentApp('settings')
    },
    
    {
      id: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      color: 'bg-gradient-to-br from-sky-400 to-sky-500',
      onClick: () => window.open('https://twitter.com/emmankwoh', '_blank')
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-gradient-to-br from-blue-600 to-blue-700',
      onClick: () => window.open('https://www.linkedin.com/in/emma-en', '_blank')
    },
    
    // Additional Native Apps (placeholders)
    { 
      id: 'music',
      label: 'Music',
      icon: Music,
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      onClick: () => setCurrentApp('music')
    },
    { 
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      onClick: () => setCurrentApp('messages')
    }
  ];

  const renderCurrentApp = () => {
    switch (currentApp) {
      case 'about':
        return <AboutApp onBack={() => setCurrentApp('home')} />;
      case 'github':
        return <GitHubApp onBack={() => setCurrentApp('home')} />;
      case 'projects':
        return <ProjectsApp onBack={() => setCurrentApp('home')} />;
      case 'skills':
        return <SkillsApp onBack={() => setCurrentApp('home')} />;
      case 'contact':
        return <ContactApp onBack={() => setCurrentApp('home')} />;
      case 'calculator':
        return <CalculatorApp onBack={() => setCurrentApp('home')} />;
      case 'clock':
        return <ClockApp onBack={() => setCurrentApp('home')} />;
      case 'weather':
        return <WeatherApp onBack={() => setCurrentApp('home')} />;
      case 'snake':
        return <SnakeGameApp onBack={() => setCurrentApp('home')} />;
      case 'tictactoe':
        return <TicTacToeApp onBack={() => setCurrentApp('home')} />;
      case 'settings':
        return <SettingsApp onBack={() => setCurrentApp('home')} />;
      case 'photos':
        return <QRCodeApp onBack={() => setCurrentApp('home')} />;
      case 'music':
        return <MusicApp onBack={() => setCurrentApp('home')} />;
      case 'messages':
        return <MessagesApp onBack={() => setCurrentApp('home')} />;
      default:
        return null;
    }
  };

  if (currentApp !== 'home') {
    return renderCurrentApp();
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StatusBar />
      <DynamicIsland />
      
      {/* Home Screen */}
      <div className="pt-20 pb-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-8 px-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4 bounce-in">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Iheoma Nkwo</h1>
          <p className="text-muted-foreground text-sm">Wellness & Mindful Tech Person</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/20 text-success text-xs mt-2">
            <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
            Online
          </div>
        </div>

        {/* App Grid */}
        <div className="flex-1 px-6">
          <div className="app-grid max-w-sm mx-auto">
            {apps.map((app, index) => (
              <div 
                key={app.id} 
                className="bounce-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AppIcon
                  icon={app.icon}
                  label={app.label}
                  color={app.color}
                  onClick={app.onClick}
                  badge={app.badge}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dock/Footer */}
        <div className="px-6 pt-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-1 px-4 py-2 rounded-full bg-dock-background/80 backdrop-blur-sm border border-border/20">
              <div className="w-2 h-2 rounded-full bg-foreground/40"></div>
              <div className="w-2 h-2 rounded-full bg-foreground/40"></div>
              <div className="w-2 h-2 rounded-full bg-foreground/40"></div>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Swipe up for more apps • Tap icons to explore
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
