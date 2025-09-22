import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, GitFork, ExternalLink, Calendar, Github, RefreshCcw } from 'lucide-react';
import { usePinnedRepos, formatDate } from '@/lib/github-utils';
import { MobileScreen } from '../MobileScreen';

interface ProjectsAppProps {
  onBack: () => void;
}

export const ProjectsApp = ({ onBack }: ProjectsAppProps) => {
  // Fetch pinned repositories from GitHub
  const { data: pinnedRepos, isLoading, refetch } = usePinnedRepos();

  return (
    <MobileScreen title="Projects" onBack={onBack}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pinned Repositories</h2>
        <button 
          onClick={() => refetch()}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary/70 transition-colors"
          aria-label="Refresh projects"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          // Skeleton loaders for projects
          Array(4).fill(0).map((_, index) => (
            <Card key={index} className="p-4 bg-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                </div>
                <Skeleton className="w-4 h-4 rounded-full ml-2 flex-shrink-0" />
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
            </Card>
          ))
        ) : pinnedRepos && pinnedRepos.length > 0 ? (
          pinnedRepos.map((repo) => (
            <Card key={repo.id} className="p-4 bg-card hover:bg-card/80 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground">{repo.name}</h3>
                    {repo.fork && (
                      <GitFork className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  {repo.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {repo.description}
                    </p>
                  )}
                </div>
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {repo.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{repo.topics.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  {repo.language && (
                    <div className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full ${repo.language === 'JavaScript' ? 'bg-yellow-500' : repo.language === 'TypeScript' ? 'bg-blue-500' : 'bg-green-500'}`} />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  {repo.forks_count > 0 && (
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-3 h-3" />
                      <span>{repo.forks_count}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(repo.updated_at)}</span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 bg-card text-center">
            <Github className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Unable to load pinned repositories from GitHub.
            </p>
            <button 
              onClick={() => refetch()}
              className="inline-flex items-center space-x-1 text-primary hover:text-primary-glow transition-colors"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Try again</span>
            </button>
          </Card>
        )}

        <Card className="p-6 bg-card text-center">
          <Github className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            View all repositories on GitHub
          </p>
          <a 
            href="https://github.com/pxlcrtiv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 mt-2 text-primary hover:text-primary-glow transition-colors"
          >
            <span>github.com/pxlcrtiv</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </Card>
      </div>
    </MobileScreen>
  );
};