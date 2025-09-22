import { MobileScreen } from '../MobileScreen';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Code, Palette, Brain, Server, Github, RefreshCcw, Database, Zap } from 'lucide-react';
import { useGitHubRepos, calculateSkillLevels } from '@/lib/github-utils';

interface SkillsAppProps {
  onBack: () => void;
}

// Define skill categories with base skills
const baseSkillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "text-primary",
    baseSkills: ["JavaScript", "TypeScript", "React", "HTML", "CSS"],
    defaultSkills: [
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "HTML/CSS", level: 90 }
    ]
  },
  {
    title: "Backend & Tools",
    icon: Server,
    color: "text-accent",
    baseSkills: ["Python", "Node.js", "PHP", "Java", "Rust"],
    defaultSkills: [
      { name: "Python", level: 75 },
      { name: "Node.js", level: 70 },
      { name: "PHP", level: 65 },
      { name: "Java", level: 60 }
    ]
  },
  {
    title: "Database & Storage",
    icon: Database,
    color: "text-warning",
    baseSkills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    defaultSkills: [
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 65 },
      { name: "MySQL", level: 60 }
    ]
  },
  {
    title: "AI & Innovation",
    icon: Brain,
    color: "text-success",
    baseSkills: ["AI", "Machine Learning", "Automation"],
    defaultSkills: [
      { name: "AI Tools Integration", level: 85 },
      { name: "Machine Learning", level: 70 },
      { name: "Automation", level: 80 },
      { name: "Wellness Tech", level: 90 }
    ]
  }
];

export const SkillsApp = ({ onBack }: SkillsAppProps) => {
  // Fetch GitHub repositories to analyze for skills
  const { data: repos, isLoading, refetch } = useGitHubRepos();
  
  // Calculate skill levels based on GitHub repositories
  const skillLevels = repos ? calculateSkillLevels(repos) : {};
  
  // Get all unique technologies from repositories and base skills
  const getTechnologies = () => {
    if (!repos) return [];
    
    const repoTech = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) repoTech.add(repo.language);
      repo.topics.forEach(topic => repoTech.add(topic));
    });
    
    // Add base skills to ensure they're always included
    baseSkillCategories.forEach(category => {
      category.baseSkills.forEach(skill => repoTech.add(skill));
    });
    
    return Array.from(repoTech).sort((a, b) => a.localeCompare(b));
  };
  
  const technologies = getTechnologies();
  
  // Merge default skills with GitHub-derived skill levels
  const getSkillCategories = () => {
    return baseSkillCategories.map(category => {
      // Create skills array with merged levels
      const skills = category.defaultSkills.map(skill => {
        // Try to find a matching skill level from GitHub data
        let githubLevel = 0;
        Object.entries(skillLevels).forEach(([tech, level]) => {
          if (skill.name.toLowerCase().includes(tech.toLowerCase()) || 
              tech.toLowerCase().includes(skill.name.toLowerCase())) {
            githubLevel = Math.max(githubLevel, level);
          }
        });
        
        // Combine default level with GitHub level (70% weight to default, 30% to GitHub)
        const finalLevel = Math.round((skill.level * 0.7) + (githubLevel * 0.3));
        return {
          ...skill,
          level: finalLevel > 0 ? finalLevel : skill.level
        };
      });
      
      return {
        ...category,
        skills
      };
    });
  };
  
  const skillCategories = getSkillCategories();

  return (
    <MobileScreen title="Skills & Tech" onBack={onBack}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Technical Proficiency</h2>
        <button 
          onClick={() => refetch()}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary/70 transition-colors"
          aria-label="Refresh skills"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Tech Stack Overview */}
        <Card className="p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Technology Stack</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <Github className="w-3 h-3 mr-1" />
              <span>Based on GitHub activity</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              {Array(8).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-5 w-16 rounded-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 15).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {technologies.length > 15 && (
                <Badge variant="outline" className="text-xs">
                  +{technologies.length - 15}
                </Badge>
              )}
            </div>
          )}
        </Card>

        {/* Skill Categories */}
        {skillCategories.map((category, index) => (
          <Card key={index} className="p-6 bg-card">
            <div className="flex items-center space-x-3 mb-4">
              <category.icon className={`w-6 h-6 ${category.color}`} />
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                // Skeleton loaders for skills
                category.defaultSkills.map((_, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Progress value={0} className="h-2 bg-secondary" />
                  </div>
                ))
              ) : (
                category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className={`h-2 ${skill.level > 75 ? 'bg-green-500' : skill.level > 50 ? 'bg-blue-500' : 'bg-yellow-500'}`} 
                    />
                  </div>
                ))
              )}
            </div>
          </Card>
        ))}

        {/* Experience Stats */}
        <Card className="p-6 bg-gradient-accent text-white">
          <h3 className="text-lg font-semibold mb-4">Experience Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{repos ? repos.length : '40+'}</div>
              <div className="text-sm opacity-90">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{repos ? new Set(repos.map(r => r.language)).size : '10+'}</div>
              <div className="text-sm opacity-90">Technologies Used</div>
            </div>
          </div>
        </Card>

        {/* Specializations */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-3">Specializations</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm">Wellness & Mindful Technology</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-sm">AI-Powered Applications</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <span className="text-sm">Interactive Web Experiences</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-sm">Collaborative Development</span>
            </div>
          </div>
        </Card>
      </div>
    </MobileScreen>
  );
};