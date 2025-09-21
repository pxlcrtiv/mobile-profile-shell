import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { ArrowLeft, Github, Star, GitFork, Code, ExternalLink, Calendar, User, Users, Heart, Clock, RefreshCcw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { MobileScreen } from '../MobileScreen';

interface GitHubAppProps {
  onBack: () => void;
}

// Types for GitHub data
interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  email: string | null;
  blog: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  topics: string[];
}

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return 'Today';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Mock data for when API is not available or during development
const mockUser: GitHubUser = {
  login: 'pxlcrtiv',
  name: 'Iheoma Nkwo',
  avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
  bio: 'Wellness and Mindful Tech Person passionate about creating meaningful digital experiences.',
  location: 'Remote • Born in Nigeria',
  email: 'example@email.com',
  blog: 'https://emmankwoh.framer.website',
  twitter_username: 'emmankwoh',
  public_repos: 24,
  public_gists: 5,
  followers: 156,
  following: 78,
  created_at: '2020-01-15T00:00:00Z',
  updated_at: new Date().toISOString(),
};

const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'Panorama Streetviewer',
    description: 'A powerful, interactive web application that enables users to explore panoramic imagery with advanced navigation capabilities.',
    language: 'JavaScript',
    stargazers_count: 42,
    forks_count: 12,
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/pxlcrtiv/panorama-streetviewer',
    topics: ['panorama-viewer', 'maps', 'javascript']
  },
  {
    id: 2,
    name: 'Adiva',
    description: 'A cutting-edge, AI-powered advertising creation platform that leverages Google\'s Gemini AI.',
    language: 'TypeScript',
    stargazers_count: 78,
    forks_count: 23,
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/pxlcrtiv/adiva',
    topics: ['image', 'ads', 'image-editor', 'image-generation', 'generative-ai']
  },
  {
    id: 3,
    name: 'Sonic Dreamscape Orchestrator',
    description: 'A professional-grade web application for generating healing frequencies and binaural beats.',
    language: 'TypeScript',
    stargazers_count: 35,
    forks_count: 8,
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/pxlcrtiv/sonic-dreamscape',
    topics: ['meditation', 'frequency-generator', 'meditation-practice']
  },
  {
    id: 4,
    name: 'Activepieces',
    description: 'AI Agents & MCPs & AI Workflow Automation • (~400 MCP servers for AI agents).',
    language: 'TypeScript',
    stargazers_count: 120,
    forks_count: 45,
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/pxlcrtiv/activepieces',
    topics: ['ai', 'workflow', 'automation']
  }
];

// Mock contribution data for the chart
const contributionData = [
  { name: 'Mon', contributions: 5 },
  { name: 'Tue', contributions: 12 },
  { name: 'Wed', contributions: 8 },
  { name: 'Thu', contributions: 15 },
  { name: 'Fri', contributions: 7 },
  { name: 'Sat', contributions: 3 },
  { name: 'Sun', contributions: 9 },
];

// GitHub API functions
const fetchGitHubUser = async (): Promise<GitHubUser> => {
  try {
    const response = await fetch('https://api.github.com/users/pxlcrtiv');
    if (!response.ok) throw new Error('Failed to fetch GitHub user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    // Return mock data when API fails
    return mockUser;
  }
};

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch('https://api.github.com/users/pxlcrtiv/repos?sort=updated&per_page=100');
    if (!response.ok) throw new Error('Failed to fetch GitHub repos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return mock data when API fails
    return mockRepos;
  }
};

export const GitHubApp = ({ onBack }: GitHubAppProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Fetch GitHub data using React Query
  const { data: userData, isLoading: userLoading, refetch: refetchUser } = useQuery<GitHubUser>({
    queryKey: ['githubUser'],
    queryFn: fetchGitHubUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: reposData, isLoading: reposLoading, refetch: refetchRepos } = useQuery<GitHubRepo[]>({
    queryKey: ['githubRepos'],
    queryFn: fetchGitHubRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const user = userData || mockUser;
  const repos = reposData || mockRepos;

  // Filter repositories by language if selected
  const filteredRepos = selectedLanguage
    ? repos.filter(repo => repo.language === selectedLanguage)
    : repos;

  // Get unique languages from repositories
  const languages = Array.from(new Set(repos.map(repo => repo.language).filter(Boolean)));

  // Refetch all data
  const refetchAll = () => {
    refetchUser();
    refetchRepos();
  };

  return (
    <MobileScreen title="GitHub Profile" onBack={onBack}>
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-background">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={refetchAll}
            className="h-8 w-8 rounded-full"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Profile Header */}
          <Card className="p-6 bg-gradient-primary">
            {userLoading ? (
              <div className="flex flex-col items-center">
                <Skeleton className="w-24 h-24 rounded-full mb-4 border-4 border-white/20" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-white/20">
                  <img src={user.avatar_url} alt={user.name} className="object-cover" />
                </Avatar>
                <h2 className="text-xl font-bold text-white mb-2">{user.name}</h2>
                <p className="text-white/90 mb-4">@{user.login}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/30 text-white text-sm">
                  <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
                  Active {formatDate(user.updated_at)}
                </div>
              </div>
            )}
          </Card>

          {/* Bio */}
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold mb-3">Bio</h3>
            {userLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
            )}
          </Card>

          {/* Stats */}
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold mb-3">Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                {userLoading ? (
                  <Skeleton className="h-6 w-12 mx-auto mb-1" />
                ) : (
                  <p className="text-2xl font-bold">{user.public_repos}</p>
                )}
                <p className="text-xs text-muted-foreground">Repositories</p>
              </div>
              <div className="text-center">
                {userLoading ? (
                  <Skeleton className="h-6 w-12 mx-auto mb-1" />
                ) : (
                  <p className="text-2xl font-bold">{user.followers}</p>
                )}
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                {userLoading ? (
                  <Skeleton className="h-6 w-12 mx-auto mb-1" />
                ) : (
                  <p className="text-2xl font-bold">{user.following}</p>
                )}
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
          </Card>

          {/* Contribution Activity */}
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="h-40">
              <ChartContainer config={{}}>
                <BarChart data={contributionData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="contributions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="flex justify-center mt-4 space-x-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-100 mr-1"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-300 mr-1"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span>High</span>
              </div>
            </div>
          </Card>

          {/* Links */}
          {!userLoading && (
            <Card className="p-6 bg-card">
              <h3 className="text-lg font-semibold mb-3">Links</h3>
              <div className="space-y-3">
                {user.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.blog && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-accent" />
                    <a 
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-glow transition-colors truncate"
                    >
                      {user.blog}
                    </a>
                  </div>
                )}
                {user.twitter_username && (
                  <div className="flex items-center space-x-3">
                    <Twitter className="w-5 h-5 text-accent" />
                    <a 
                      href={`https://twitter.com/${user.twitter_username}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-glow transition-colors"
                    >
                      @{user.twitter_username}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-accent" />
                  <a 
                    href={`https://github.com/${user.login}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-glow transition-colors"
                  >
                    github.com/{user.login}
                  </a>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Repositories Tab */}
        <TabsContent value="repositories" className="space-y-4">
          {/* Language Filter */}
          {languages.length > 0 && (
            <div className="flex overflow-x-auto py-2 space-x-2">
              <Badge 
                variant={selectedLanguage === null ? "default" : "secondary"}
                onClick={() => setSelectedLanguage(null)}
                className="cursor-pointer whitespace-nowrap"
              >
                All
              </Badge>
              {languages.map(language => (
                <Badge 
                  key={language}
                  variant={selectedLanguage === language ? "default" : "secondary"}
                  onClick={() => setSelectedLanguage(language)}
                  className="cursor-pointer whitespace-nowrap"
                >
                  {language}
                </Badge>
              ))}
            </div>
          )}

          {/* Repositories List */}
          {reposLoading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index} className="p-4">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => (
              <Card key={repo.id} className="p-4 bg-card hover:bg-card/80 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">{repo.name}</h3>
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
                    className="text-muted-foreground hover:text-foreground transition-colors ml-2"
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
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-3 h-3" />
                      <span>{repo.forks_count}</span>
                    </div>
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
              <Code className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Repositories Found</h3>
              <p className="text-sm text-muted-foreground">
                {selectedLanguage ? `No repositories found with ${selectedLanguage}.` : 'No public repositories available.'}
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="p-8 bg-card text-center">
            <Clock className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Recent Activity Feed</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This section shows your recent GitHub activity including commits, pull requests, and issues.
            </p>
            <Button 
              variant="default" 
              className="gap-2"
              onClick={() => window.open(`https://github.com/${user.login}`, '_blank', 'noopener noreferrer')}
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Button>
          </Card>

          {/* Sample Activity Items */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-4 bg-card">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    {item === 1 ? <Code className="w-4 h-4" /> : item === 2 ? <GitFork className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{user.name}</span> {item === 1 ? "pushed 3 commits to" : item === 2 ? "forked" : "starred"} <span className="text-accent font-medium">{mockRepos[item - 1].name}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(new Date(Date.now() - item * 60 * 60 * 1000).toISOString())}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MobileScreen>
  );
};

// Import missing components
import { MapPin, Globe, Twitter } from 'lucide-react';