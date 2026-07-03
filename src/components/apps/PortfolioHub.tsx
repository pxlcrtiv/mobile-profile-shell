import { MobileScreen } from '@/components/MobileScreen';
import { useGitHubUser, useGitHubRepos, generateContributionData, calculateSkillLevels, formatDate } from '@/lib/github-utils';
import { User, MapPin, Calendar, Link as LinkIcon, Twitter, Users, GitFork, Star, Code, ExternalLink, Github } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PortfolioHubProps {
  onBack: () => void;
}

const CONTRIBUTION_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

export const PortfolioHub = ({ onBack }: PortfolioHubProps) => {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();
  const contributionData = generateContributionData();
  const skillLevels = repos ? calculateSkillLevels(repos) : {};
  const sortedSkills = Object.entries(skillLevels).sort(([, a], [, b]) => b - a);

  const publicRepos = repos?.filter(r => !r.fork && !r.private) || [];
  const totalStars = publicRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const topLanguages = sortedSkills.slice(0, 5);
  const topRepos = [...publicRepos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

  return (
    <MobileScreen title="Portfolio" onBack={onBack}>
      <div className="space-y-6 pb-12">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-6 text-center space-y-4">
          <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-full bg-gradient-primary blur-xl opacity-50 animate-pulse" />
            <img
              src={user?.avatar_url || 'https://avatars.githubusercontent.com/u/12345678?v=4'}
              alt={user?.name || 'Profile'}
              className="relative w-24 h-24 rounded-full ring-2 ring-white/20 mx-auto"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name || 'Iheoma Nkwo'}</h2>
            <p className="text-sm text-muted-foreground mt-1">{user?.bio || ''}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            {user?.location && (
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{user.location}</span>
            )}
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Joined {user ? formatDate(user.created_at) : ''}</span>
            {user?.blog && (
              <a href={user.blog} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                <LinkIcon className="w-3 h-3" />Website
              </a>
            )}
            {user?.twitter_username && (
              <span className="flex items-center gap-1"><Twitter className="w-3 h-3" />@{user.twitter_username}</span>
            )}
          </div>
          <div className="flex justify-center gap-6 pt-2">
            <div className="text-center"><div className="text-lg font-bold">{user?.followers || 0}</div><div className="text-[10px] text-muted-foreground">Followers</div></div>
            <div className="text-center"><div className="text-lg font-bold">{user?.following || 0}</div><div className="text-[10px] text-muted-foreground">Following</div></div>
            <div className="text-center"><div className="text-lg font-bold">{publicRepos.length}</div><div className="text-[10px] text-muted-foreground">Repos</div></div>
            <div className="text-center"><div className="text-lg font-bold">{totalStars}</div><div className="text-[10px] text-muted-foreground">Stars</div></div>
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Github className="w-4 h-4" />GitHub Activity</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="contributions" radius={[4, 4, 0, 0]}>
                  {contributionData.map((_, index) => (
                    <Cell key={index} fill={CONTRIBUTION_COLORS[index % CONTRIBUTION_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Skills */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2"><Code className="w-4 h-4" />Top Skills</h3>
          <div className="space-y-2">
            {topLanguages.map(([lang, level]) => (
              <div key={lang}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{lang}</span><span className="text-muted-foreground">{level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500" style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Repositories */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2"><GitFork className="w-4 h-4" />Featured Repos</h3>
          <div className="space-y-3">
            {topRepos.map(repo => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="block glass-card rounded-xl p-4 hover:bg-secondary/50 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <GitFork className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="font-medium text-sm truncate">{repo.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{repo.description || 'No description'}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-aurora-indigo" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MobileScreen>
  );
};
