import { useState } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { AppIcon } from '@/components/AppIcon';
import { AboutApp } from '@/components/apps/AboutApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { SkillsApp } from '@/components/apps/SkillsApp';
import { ContactApp } from '@/components/apps/ContactApp';
import { User, FolderOpen, Code, Mail, Github, Twitter, Linkedin, Settings } from 'lucide-react';

type AppType = 'home' | 'about' | 'projects' | 'skills' | 'contact';

const Index = () => {
  const [currentApp, setCurrentApp] = useState<AppType>('home');

  const apps = [
    {
      id: 'about',
      label: 'About Me',
      icon: User,
      color: 'bg-gradient-primary',
      onClick: () => setCurrentApp('about')
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      color: 'bg-gradient-accent',
      onClick: () => setCurrentApp('projects'),
      badge: 4
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Code,
      color: 'bg-gradient-to-br from-warning to-warning/70',
      onClick: () => setCurrentApp('skills')
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      color: 'bg-gradient-to-br from-success to-success/70',
      onClick: () => setCurrentApp('contact')
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      color: 'bg-gradient-to-br from-secondary to-muted',
      onClick: () => window.open('https://github.com/pxlcrtiv', '_blank')
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      onClick: () => window.open('https://twitter.com/emmankwoh', '_blank')
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-gradient-to-br from-blue-700 to-blue-800',
      onClick: () => window.open('https://www.linkedin.com/in/emma-en', '_blank')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'bg-gradient-to-br from-muted to-border',
      onClick: () => console.log('Settings clicked')
    }
  ];

  const renderCurrentApp = () => {
    switch (currentApp) {
      case 'about':
        return <AboutApp onBack={() => setCurrentApp('home')} />;
      case 'projects':
        return <ProjectsApp onBack={() => setCurrentApp('home')} />;
      case 'skills':
        return <SkillsApp onBack={() => setCurrentApp('home')} />;
      case 'contact':
        return <ContactApp onBack={() => setCurrentApp('home')} />;
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
      
      {/* Home Screen */}
      <div className="pt-16 pb-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-8 px-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4 bounce-in">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Iheoma Nkwo</h1>
          <p className="text-muted-foreground text-sm">Wellness & Mindful Tech Person</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs mt-2">
            🤒 Out sick
          </div>
        </div>

        {/* App Grid */}
        <div className="flex-1 px-6">
          <div className="app-grid max-w-md mx-auto">
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
