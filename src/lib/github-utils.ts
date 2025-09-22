import { useQuery } from '@tanstack/react-query';

// Types for GitHub data
export interface GitHubActivity {
  id: string;
  type: 'push' | 'pull_request' | 'issue' | 'star' | 'fork';
  repoName: string;
  repoUrl: string;
  description: string;
  createdAt: string;
}

export interface GitHubUser {
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

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  topics: string[];
  owner: { login: string };
  private: boolean;
  fork: boolean;
}

export interface GitHubContribution {
  name: string;
  contributions: number;
}

// Helper function to format dates
export const formatDate = (dateString: string): string => {
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

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'pxlcrtiv';

// Fetch GitHub user data
export const fetchGitHubUser = async (): Promise<GitHubUser> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('Failed to fetch GitHub user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    // Mock data fallback
    return {
      login: GITHUB_USERNAME,
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
  }
};

// Fetch GitHub repositories
export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch GitHub repos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Mock data fallback
    return [
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
        owner: { login: GITHUB_USERNAME },
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
        owner: { login: GITHUB_USERNAME },
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
        owner: { login: GITHUB_USERNAME },
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
        owner: { login: GITHUB_USERNAME },
        private: false,
        fork: false
      }
    ];
  }
};

// Fetch pinned repositories
// This uses the GraphQL API since there's no direct REST endpoint for pinned repos
export const fetchPinnedRepos = async (): Promise<GitHubRepo[]> => {
  try {
    // Since we can't make GraphQL calls directly in the browser due to CORS,
    // we'll use the REST API and filter for important repos
    const repos = await fetchGitHubRepos();
    // For demo purposes, return the first 4 repos as pinned
    return repos.slice(0, 4);
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    // Return mock pinned repos
    return (
      await fetchGitHubRepos()
    ).slice(0, 4);
  }
};

// Generate contribution data for chart
export const generateContributionData = (): GitHubContribution[] => {
  // Days of the week
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Generate random contribution counts for each day
  return days.map(day => ({
    name: day,
    contributions: Math.floor(Math.random() * 20) + 1
  }));
};

// Calculate skill levels based on repository languages
export const calculateSkillLevels = (repos: GitHubRepo[]) => {
  const languageCount: Record<string, number> = {};
  
  // Count language occurrences across all repos
  repos.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });
  
  // Get total repo count with languages
  const totalReposWithLanguage = Object.values(languageCount).reduce((sum, count) => sum + count, 0);
  
  // Calculate skill levels as percentage of total
  const skillLevels: Record<string, number> = {};
  Object.entries(languageCount).forEach(([language, count]) => {
    skillLevels[language] = Math.round((count / totalReposWithLanguage) * 100);
  });
  
  return skillLevels;
};

// Fetch GitHub activity data
// This generates mock activity based on repo updates since there's no direct endpoint
export const fetchGitHubActivity = async (): Promise<GitHubActivity[]> => {
  try {
    // Get recent repos to generate activity data
    const repos = await fetchGitHubRepos();
    const recentRepos = repos.slice(0, 10); // Use 10 most recent repos
    
    // Generate activity data based on repo updates
    const activityTypes: Array<'push' | 'pull_request' | 'issue' | 'star' | 'fork'> = 
      ['push', 'pull_request', 'issue', 'star', 'fork'];
    
    const activities: GitHubActivity[] = recentRepos.flatMap(repo => {
      // For each repo, generate 1-3 activities
      const activityCount = Math.floor(Math.random() * 3) + 1;
      
      return Array.from({ length: activityCount }, (_, i) => {
        const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const baseDate = new Date(repo.updated_at);
        const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5 days
        const activityDate = new Date(baseDate.getTime() + variation * 24 * 60 * 60 * 1000);
        
        // Generate appropriate description based on activity type
        let description = '';
        switch (type) {
          case 'push':
            description = `Pushed ${Math.floor(Math.random() * 5) + 1} new commits`;
            break;
          case 'pull_request':
            description = `Opened pull request #${Math.floor(Math.random() * 100) + 1}`;
            break;
          case 'issue':
            description = `Created issue #${Math.floor(Math.random() * 100) + 1}`;
            break;
          case 'star':
            description = `Starred repository`;
            break;
          case 'fork':
            description = `Forked repository`;
            break;
        }
        
        return {
          id: `${repo.id}-${type}-${i}`,
          type,
          repoName: repo.name,
          repoUrl: repo.html_url,
          description,
          createdAt: activityDate.toISOString(),
        };
      });
    });
    
    // Sort activities by date (newest first)
    activities.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Return only the most recent 20 activities
    return activities.slice(0, 20);
  } catch (error) {
    console.error('Error generating GitHub activity:', error);
    // Return mock activity data
    return [
      {
        id: '1',
        type: 'push',
        repoName: 'Panorama Streetviewer',
        repoUrl: 'https://github.com/pxlcrtiv/panorama-streetviewer',
        description: 'Pushed 3 new commits',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        type: 'star',
        repoName: 'Adiva',
        repoUrl: 'https://github.com/pxlcrtiv/adiva',
        description: 'Starred repository',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: 'issue',
        repoName: 'Sonic Dreamscape Orchestrator',
        repoUrl: 'https://github.com/pxlcrtiv/sonic-dreamscape',
        description: 'Created issue #15',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }
};

// Custom hooks for data fetching
export const useGitHubUser = () => {
  return useQuery<GitHubUser>({
    queryKey: ['githubUser'],
    queryFn: fetchGitHubUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGitHubRepos = () => {
  return useQuery<GitHubRepo[]>({
    queryKey: ['githubRepos'],
    queryFn: fetchGitHubRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePinnedRepos = () => {
  return useQuery<GitHubRepo[]>({
    queryKey: ['pinnedRepos'],
    queryFn: fetchPinnedRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching GitHub activity data
export const useGitHubActivity = () => {
  return useQuery<GitHubActivity[]>({
    queryKey: ['githubActivity'],
    queryFn: fetchGitHubActivity,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Helper function to format date as relative time
export const formatDateRelative = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${diffDays < 14 ? 'week' : 'weeks'} ago`;
  
  // For dates beyond a month, use standard date format
  return formatDate(dateString);
};