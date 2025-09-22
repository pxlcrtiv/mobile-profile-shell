import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Github, Star, GitFork, Code, ExternalLink, Calendar, User, Users, Heart, Clock, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { MobileScreen } from '../MobileScreen';

// Import GitHub utilities and types
import { useGitHubUser, useGitHubRepos, useGitHubActivity, formatDateRelative, GitHubUser, GitHubRepo, GitHubContribution, GitHubActivity } from '../../lib/github-utils';

interface GitHubAppProps {
  onBack: () => void;
}

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

// Mock repositories
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
    topics: ['panorama-viewer', 'maps', 'javascript'],
    owner: { login: 'pxlcrtiv' },
    private: false,
    fork: false
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
    topics: ['image', 'ads', 'image-editor', 'image-generation', 'generative-ai'],
    owner: { login: 'pxlcrtiv' },
    private: false,
    fork: false
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
    topics: ['meditation', 'frequency-generator', 'meditation-practice'],
    owner: { login: 'pxlcrtiv' },
    private: false,
    fork: false
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
    topics: ['ai', 'workflow', 'automation'],
    owner: { login: 'pxlcrtiv' },
    private: false,
    fork: false
  }
];

// Mock contribution data for the chart
const mockActivityData: GitHubContribution[] = [
  { name: 'Mon', contributions: 5 },
  { name: 'Tue', contributions: 12 },
  { name: 'Wed', contributions: 8 },
  { name: 'Thu', contributions: 15 },
  { name: 'Fri', contributions: 7 },
  { name: 'Sat', contributions: 3 },
  { name: 'Sun', contributions: 9 },
];

export const GitHubApp = ({ onBack }: GitHubAppProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Use GitHub utilities hooks
  const { data: userData, isLoading: userLoading, refetch: refetchUser } = useGitHubUser();
  const { data: reposData, isLoading: reposLoading, refetch: refetchRepos } = useGitHubRepos();
  const { data: activityData } = useGitHubActivity();

  const user = userData || mockUser;
  const repos = reposData || mockRepos;
  const chartData = activityData || mockActivityData;

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
                  Active {formatDateRelative(user.updated_at)}
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

          {/* Recent Activity */}
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorContribs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px', 
                      color: '#f9fafb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="contributions" 
                    stroke="#4f46e5" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorContribs)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Social Links */}
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full"
                onClick={() => window.open(`https://github.com/${user.login}`, '_blank')}
              >
                <Github className="h-5 w-5" />
              </Button>
              {user.twitter_username && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-12 w-12 rounded-full"
                  onClick={() => window.open(`https://twitter.com/${user.twitter_username}`, '_blank')}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
              {user.blog && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-12 w-12 rounded-full"
                  onClick={() => window.open(user.blog, '_blank')}
                >
                  <ExternalLink className="h-5 w-5" />
                </Button>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Repositories Tab */}
        <TabsContent value="repositories" className="space-y-6">
          {/* Language Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLanguage === null ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedLanguage(null)}
            >
              All
            </Button>
            {languages.map(language => (
              <Button
                key={language}
                variant={selectedLanguage === language ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedLanguage(language === selectedLanguage ? null : language)}
              >
                {language}
              </Button>
            ))}
          </div>

          {/* Repository List */}
          <div className="space-y-4">
            {reposLoading ? (
              // Skeleton loaders for repositories
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="p-4 bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </Card>
              ))
            ) : filteredRepos.length > 0 ? (
              filteredRepos.map(repo => (
                <Card key={repo.id} className="p-4 bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-base font-semibold flex items-center">
                      <Code className="h-4 w-4 mr-2 text-primary" />
                      {repo.name}
                    </h4>
                    <div className="flex gap-2">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Star className="h-4 w-4 mr-1" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <GitFork className="h-4 w-4 mr-1" />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                  {repo.description && (
                    <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics.slice(0, 3).map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Updated {formatDateRelative(repo.updated_at)}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={() => window.open(repo.html_url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 bg-card text-center">
                <p className="text-muted-foreground">No repositories found with this language filter.</p>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setSelectedLanguage(null)}
                >
                  Clear Filter
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="space-y-4">
            {activityData?.length ? (
              activityData.map(item => (
                <Card key={item.id} className="p-4 bg-card">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {item.type === 'push' && <GitFork className="h-4 w-4" />}
                      {item.type === 'star' && <Star className="h-4 w-4" />}
                      {item.type === 'issue' && <Users className="h-4 w-4" />}
                      {item.type === 'pull_request' && <Code className="h-4 w-4" />}
                      {item.type === 'fork' && <Heart className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">
                        <span className="font-medium">{user.name}</span> {item.description} in <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{item.repoName}</a>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateRelative(item.createdAt)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 bg-card text-center">
                <p className="text-muted-foreground">No recent activity to display.</p>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="mt-2"
                  onClick={refetchAll}
                >
                  Refresh
                </Button>
              </Card>
            )}
          </div>
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => window.open(`https://github.com/${user.login}?tab=activity`, '_blank')}
          >
            View on GitHub
          </Button>
        </TabsContent>
      </Tabs>
    </MobileScreen>
  );
};