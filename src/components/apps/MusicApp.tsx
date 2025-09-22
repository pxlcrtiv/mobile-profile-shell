import { useState, useEffect } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle, Music as MusicIcon, Search, Library, Home, Headphones } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface MusicAppProps {
  onBack: () => void;
}

// Mock data for now - in a real implementation, this would fetch from Spotify API
const mockCurrentlyPlaying = {
  id: '1',
  title: 'Starlight',
  artist: 'Dave',
  album: "We're All Alone in This Together",
  albumArt: 'https://i.scdn.co/image/ab67616d0000b273a26e59e8b3fccda48f98480c',
  duration: 187,
  progress: 45,
  isPlaying: true
};

const mockPlaylists = [
  {
    id: '1',
    name: 'Recently Played',
    image: 'https://i.scdn.co/image/ab67616d0000b273a26e59e8b3fccda48f98480c',
    trackCount: 50
  },
  {
    id: '2',
    name: 'Discover Weekly',
    image: 'https://i.scdn.co/image/ab67616d0000b273814277586f0731c29c67c1ba',
    trackCount: 30
  },
  {
    id: '3',
    name: 'Release Radar',
    image: 'https://i.scdn.co/image/ab67616d0000b273af2be4486409f1538858fb2e',
    trackCount: 25
  },
  {
    id: '4',
    name: 'Chill Vibes',
    image: 'https://i.scdn.co/image/ab67616d0000b273f12a022c93a3c3e34a811c2c',
    trackCount: 42
  }
];

export const MusicApp = ({ onBack }: MusicAppProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(mockCurrentlyPlaying);
  const [progress, setProgress] = useState(currentlyPlaying.progress);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library'>('home');

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate progress update
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentlyPlaying.isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          // Reset when song finishes
          if (prev >= currentlyPlaying.duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentlyPlaying.isPlaying, currentlyPlaying.duration]);

  const togglePlayPause = () => {
    setCurrentlyPlaying(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <MobileScreen title="Music" onBack={onBack}>
      {/* Nav Tabs */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex justify-around py-4">
          <button 
            className={`flex flex-col items-center ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeTab === 'search' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('search')}
          >
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs">Search</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeTab === 'library' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('library')}
          >
            <Library className="h-5 w-5 mb-1" />
            <span className="text-xs">Library</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 p-4">
        {/* Spotify Profile Section */}
        <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-600">Spotify Profile</h2>
            <a 
              href="https://open.spotify.com/user/31ivu7lfgn6y6afyshqkx5pcc6sm?si=c9f7445478b645cd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:text-green-500 transition-colors"
            >
              View Profile
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">User Profile</h3>
              <p className="text-sm text-muted-foreground">Listening to music from Spotify</p>
            </div>
          </div>
        </Card>

        {/* Currently Playing */}
        <Card className="p-4 bg-card">
          <h3 className="text-lg font-semibold mb-4">Now Playing</h3>
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="w-20 h-20 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={currentlyPlaying.albumArt} 
                  alt={currentlyPlaying.album} 
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{currentlyPlaying.title}</h4>
                  <p className="text-sm text-muted-foreground">{currentlyPlaying.artist}</p>
                  <p className="text-xs text-muted-foreground">{currentlyPlaying.album}</p>
                  <div className="mt-2">
                    <input 
                      type="range" 
                      min="0" 
                      max={currentlyPlaying.duration} 
                      value={progress} 
                      onChange={(e) => setProgress(parseInt(e.target.value))}
                      className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatTime(progress)}</span>
                      <span>{formatTime(currentlyPlaying.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-between px-4">
                <Shuffle className="h-5 w-5 text-muted-foreground" />
                <SkipBack className="h-6 w-6 text-foreground" />
                <Button 
                  onClick={togglePlayPause}
                  className="h-12 w-12 rounded-full flex items-center justify-center bg-primary hover:bg-primary/90"
                >
                  {currentlyPlaying.isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-0.5" />
                  )}
                </Button>
                <SkipForward className="h-6 w-6 text-foreground" />
                <Repeat className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}
        </Card>

        {/* Playlists */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Playlists</h3>
          <div className="space-y-3">
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Skeleton className="w-14 h-14 rounded-md" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))
            ) : (
              mockPlaylists.map(playlist => (
                <Card 
                  key={playlist.id} 
                  className="p-3 flex items-center space-x-3 hover:bg-secondary/20 transition-colors cursor-pointer"
                >
                  <img 
                    src={playlist.image} 
                    alt={playlist.name} 
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{playlist.name}</h4>
                    <p className="text-xs text-muted-foreground">{playlist.trackCount} tracks</p>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                    <Play className="h-4 w-4 text-primary" />
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mini Player (sticky at bottom) */}
      {!isLoading && (
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border p-3">
          <div className="flex items-center space-x-3">
            <img 
              src={currentlyPlaying.albumArt} 
              alt={currentlyPlaying.album} 
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-sm truncate">{currentlyPlaying.title}</h5>
              <p className="text-xs text-muted-foreground truncate">{currentlyPlaying.artist}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <Button 
                onClick={togglePlayPause}
                size="sm" 
                className="h-8 w-8 rounded-full flex items-center justify-center bg-primary hover:bg-primary/90"
              >
                {currentlyPlaying.isPlaying ? (
                  <Pause className="h-4 w-4 text-white" />
                ) : (
                  <Play className="h-4 w-4 text-white ml-0.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </MobileScreen>
  );
};