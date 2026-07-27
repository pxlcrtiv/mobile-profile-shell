import { MobileScreen } from '@/components/MobileScreen';
import { useGitHubUser, useGitHubRepos, useGitHubActivity, generateContributionData, calculateSkillLevels, formatDate, formatDateRelative } from '@/lib/github-utils';
import { User, MapPin, Calendar, Link as LinkIcon, Twitter, Users, GitFork, Star, Code, ExternalLink, Github, GitCommitHorizontal, GitPullRequest, CircleDot, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PortfolioHubProps {
  onBack: () => void;
}

const CONTRIBUTION_COLORS = ['#00873C', '#0a9c47', '#27b85c', '#5fd089', '#9fe3bd'];

const ACTIVITY_ICON: Record<string, typeof GitCommitHorizontal> = {
  push: GitCommitHorizontal,
  pull_request: GitPullRequest,
  issue: MessageSquare,
  star: Star,
  fork: GitFork,
};

export const PortfolioHub = ({ onBack }: PortfolioHubProps) => {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();
  const { data: activity } = useGitHubActivity();
  const contributionData = generateContributionData();
  const skillLevels = repos ? calculateSkillLevels(repos) : {};
  const sortedSkills = Object.entries(skillLevels).sort(([, a], [, b]) => b - a);

  const publicRepos = repos?.filter(r => !r.fork && !r.private) || [];
  const totalStars = publicRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const topLanguages = sortedSkills.slice(0, 5);
  const topRepos = [...publicRepos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  const handle = user?.login || 'pxlcrtiv';

  return (
    <MobileScreen title="Portfolio" onBack={onBack}>
      <div className="space-y-6 pb-12">
        {/* Profile Header */}
        <div className="card-ui rounded-2xl p-6 text-center space-y-4">
          <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--coloros-green))] to-[hsl(var(--coloros-blue))] blur-xl opacity-50 animate-pulse" />
            <img
              src={user?.avatar_url || 'https://avatars.githubusercontent.com/u/12345678?v=4'}
              alt={user?.name || 'Profile'}
              className="relative w-24 h-24 rounded-full ring-2 ring-white/20 mx-auto"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name || 'Iheoma Nkwo'}</h2>
            <a
              href={`https://github.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-0.5"
            >
              <Github className="w-3.5 h-3.5" />@{handle}
            </a>
            <p className="text-sm text-muted-foreground mt-2">{user?.bio || ''}</p>
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
        <div className="card-ui rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Github className="w-4 h-4 text-primary" />GitHub Activity</h3>
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

        {/* Recent Activity Feed */}
        {activity && activity.length > 0 && (
          <div className="card-ui rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold flex items-center gap-2"><GitCommitHorizontal className="w-4 h-4 text-primary" />Recent · @{handle}</h3>
            <div className="space-y-2.5">
              {activity.slice(0, 6).map(item => {
                const Icon = ACTIVITY_ICON[item.type] || CircleDot;
                return (
                  <a
                    key={item.id}
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-secondary/40 transition-all duration-200"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{item.description}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{item.repoName} · {formatDateRelative(item.createdAt)}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Skills */}
        <div className="card-ui rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2"><Code className="w-4 h-4 text-primary" />Top Skills</h3>
          <div className="space-y-2">
            {topLanguages.map(([lang, level]) => (
              <div key={lang}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{lang}</span><span className="text-muted-foreground">{level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--coloros-green))] to-[hsl(var(--coloros-blue))] transition-all duration-500" style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Repositories */}
        <div className="card-ui rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold flex items-center gap-2"><GitFork className="w-4 h-4 text-primary" />Featured Repos</h3>
          <div className="space-y-3">
            {topRepos.map(repo => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="block card-ui rounded-xl p-4 hover:bg-secondary/50 transition-all duration-200">
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
                          <span className="w-2 h-2 rounded-full bg-primary" />
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
