import { MobileScreen } from '../MobileScreen';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Globe, Twitter, Linkedin, Github } from 'lucide-react';
import profileAvatar from '@/assets/profile-avatar.png';

interface AboutAppProps {
  onBack: () => void;
}

export const AboutApp = ({ onBack }: AboutAppProps) => {
  return (
    <MobileScreen title="About Me" onBack={onBack}>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="p-6 text-center bg-gradient-primary">
          <img 
            src={profileAvatar} 
            alt="Iheoma Nkwo"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
          />
          <h2 className="text-xl font-bold text-white mb-2">Iheoma Nkwo</h2>
          <p className="text-white/90 mb-4">@pxlcrtiv</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/30 text-white text-sm">
            <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
            Online
          </div>
        </Card>

        {/* Bio */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">Bio</h3>
          <p className="text-muted-foreground leading-relaxed">
            Wellness and Mindful Tech Person passionate about creating meaningful digital experiences. 
            Web developer skilled in JavaScript, React, Next.js, Python, and AI tools. 
            I create secure, engaging websites and thrive in collaborative, creative teams.
          </p>
        </Card>

        {/* Info */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-accent" />
              <span>Remote • Born in Nigeria</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-accent" />
              <span>22:05 • 6h ahead</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-accent" />
              <a 
                href="https://emmankwoh.framer.website" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-glow transition-colors"
              >
                emmankwoh.framer.website
              </a>
            </div>
          </div>
        </Card>

        {/* Social Links */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/pxlcrtiv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/emmankwoh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/emma-en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </Card>

        {/* Stats */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">GitHub Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">22</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
        </Card>
      </div>
    </MobileScreen>
  );
};