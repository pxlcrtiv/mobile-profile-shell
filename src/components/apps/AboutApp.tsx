import { MobileScreen } from '../MobileScreen';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Globe, Twitter, Linkedin, Github, RefreshCcw, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import profileAvatar from '@/assets/profile-avatar.png';
import { useGitHubUser } from '@/lib/github-utils';

interface AboutAppProps {
  onBack: () => void;
}

export const AboutApp = ({ onBack }: AboutAppProps) => {
  // Fetch GitHub user data in real-time
  const { data: githubUser, isLoading, refetch } = useGitHubUser();

  return (
    <MobileScreen title="About Me" onBack={onBack}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <button 
          onClick={() => refetch()}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary/70 transition-colors"
          aria-label="Refresh profile data"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="p-6 text-center bg-gradient-primary">
          {isLoading ? (
            <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20" />
          ) : (
            <img 
              src={githubUser?.avatar_url || profileAvatar} 
              alt={githubUser?.name || "Iheoma Nkwo"}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
            />
          )}
          {isLoading ? (
            <Skeleton className="w-32 h-6 mx-auto mb-2" />
          ) : (
            <h2 className="text-xl font-bold text-white mb-2">{githubUser?.name || 'Iheoma Nkwo'}</h2>
          )}
          {isLoading ? (
            <Skeleton className="w-20 h-4 mx-auto mb-4" />
          ) : (
            <p className="text-white/90 mb-4">@{githubUser?.login || 'pxlcrtiv'}</p>
          )}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/30 text-white text-sm">
            <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
            Online
          </div>
        </Card>

        {/* Bio */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">Bio</h3>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {githubUser?.bio || (
                "Wellness and Mindful Tech Person passionate about creating meaningful digital experiences. "
                + "Web developer skilled in JavaScript, React, Next.js, Python, and AI tools. "
                + "I create secure, engaging websites and thrive in collaborative, creative teams."
              )}
            </p>
          )}
        </Card>

        {/* Info */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-accent" />
              {isLoading ? (
                <Skeleton className="w-32 h-4" />
              ) : (
                <span>{githubUser?.location || 'Remote • Born in Nigeria'}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-accent" />
              {isLoading ? (
                <Skeleton className="w-24 h-4" />
              ) : (
                <span>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • 
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-accent" />
              {isLoading ? (
                <Skeleton className="w-40 h-4" />
              ) : githubUser?.blog ? (
                <a 
                  href={githubUser.blog} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-glow transition-colors flex items-center"
                >
                  {new URL(githubUser.blog).hostname}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              ) : (
                <a 
                  href="https://emmankwoh.framer.website" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-glow transition-colors"
                >
                  emmankwoh.framer.website
                </a>
              )}
            </div>
          </div>
        </Card>

        {/* Social Links */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a 
              href={isLoading ? "#" : `https://github.com/${githubUser?.login || 'pxlcrtiv'}`} 
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
              {isLoading ? (
                <Skeleton className="w-10 h-8 mx-auto" />
              ) : (
                <div className="text-2xl font-bold text-primary">{githubUser?.followers || '6'}</div>
              )}
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              {isLoading ? (
                <Skeleton className="w-10 h-8 mx-auto" />
              ) : (
                <div className="text-2xl font-bold text-accent">{githubUser?.following || '22'}</div>
              )}
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
          
          {!isLoading && githubUser && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{githubUser.public_repos}</div>
                <div className="text-sm text-muted-foreground">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{githubUser.public_gists}</div>
                <div className="text-sm text-muted-foreground">Gists</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </MobileScreen>
  );
};