import { MobileScreen } from '@/components/MobileScreen';
import { Heart, Share, Download, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileAvatar from '@/assets/profile-avatar.png';

interface PhotosAppProps {
  onBack: () => void;
}

export const PhotosApp = ({ onBack }: PhotosAppProps) => {
  // Mock photo data
  const photos = [
    { id: 1, src: profileAvatar, title: 'Profile Picture', date: '2024-01-15' },
    { id: 2, src: '/placeholder.svg', title: 'Project Screenshot', date: '2024-01-14' },
    { id: 3, src: '/placeholder.svg', title: 'Code Preview', date: '2024-01-13' },
    { id: 4, src: '/placeholder.svg', title: 'UI Design', date: '2024-01-12' },
    { id: 5, src: '/placeholder.svg', title: 'Team Photo', date: '2024-01-11' },
    { id: 6, src: '/placeholder.svg', title: 'Workspace', date: '2024-01-10' },
    { id: 7, src: '/placeholder.svg', title: 'Meeting Notes', date: '2024-01-09' },
    { id: 8, src: '/placeholder.svg', title: 'Inspiration', date: '2024-01-08' },
  ];

  const albums = [
    { title: 'Recent', count: 127, cover: profileAvatar },
    { title: 'Favorites', count: 23, cover: '/placeholder.svg' },
    { title: 'Screenshots', count: 45, cover: '/placeholder.svg' },
    { title: 'Projects', count: 18, cover: '/placeholder.svg' },
  ];

  return (
    <MobileScreen title="Photos" onBack={onBack}>
      <div className="space-y-6">
        {/* Albums */}
        <div>
          <h3 className="text-lg font-semibold mb-4">My Albums</h3>
          <div className="grid grid-cols-2 gap-4">
            {albums.map((album, index) => (
              <div key={index} className="bg-secondary/20 rounded-xl overflow-hidden">
                <div className="aspect-square bg-muted/30 flex items-center justify-center">
                  <img 
                    src={album.cover} 
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="font-medium text-sm">{album.title}</div>
                  <div className="text-xs text-muted-foreground">{album.count} items</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Photos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent</h3>
          <div className="grid grid-cols-3 gap-1">
            {photos.map((photo) => (
              <div key={photo.id} className="aspect-square bg-muted/30 rounded-lg overflow-hidden relative group">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-white p-2">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white p-2">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white p-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-secondary/20 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">iCloud Photos</span>
            <span className="text-sm text-muted-foreground">2.1 GB used</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {photos.length} photos and videos synced
          </div>
        </div>
      </div>
    </MobileScreen>
  );
};