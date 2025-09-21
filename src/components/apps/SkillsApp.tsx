import { MobileScreen } from '../MobileScreen';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Brain, Server } from 'lucide-react';

interface SkillsAppProps {
  onBack: () => void;
}

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "text-primary",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Vue.js", level: 70 }
    ]
  },
  {
    title: "Backend & Tools",
    icon: Server,
    color: "text-accent",
    skills: [
      { name: "Python", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "PHP", level: 70 },
      { name: "Rust", level: 60 },
      { name: "Java", level: 65 }
    ]
  },
  {
    title: "Design & UI",
    icon: Palette,
    color: "text-warning",
    skills: [
      { name: "UI/UX Design", level: 85 },
      { name: "Figma", level: 80 },
      { name: "Adobe Creative Suite", level: 75 },
      { name: "CSS/Tailwind", level: 90 }
    ]
  },
  {
    title: "AI & Innovation",
    icon: Brain,
    color: "text-success",
    skills: [
      { name: "AI Tools Integration", level: 85 },
      { name: "Machine Learning", level: 70 },
      { name: "Automation", level: 80 },
      { name: "Wellness Tech", level: 90 }
    ]
  }
];

const technologies = [
  "React", "Next.js", "TypeScript", "Python", "JavaScript", "Vue.js", 
  "Node.js", "PHP", "Rust", "Java", "HTML", "CSS", "Swift", "Dart"
];

export const SkillsApp = ({ onBack }: SkillsAppProps) => {
  return (
    <MobileScreen title="Skills & Tech" onBack={onBack}>
      <div className="space-y-6">
        {/* Tech Stack Overview */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Skill Categories */}
        {skillCategories.map((category, index) => (
          <Card key={index} className="p-6 bg-card">
            <div className="flex items-center space-x-3 mb-4">
              <category.icon className={`w-6 h-6 ${category.color}`} />
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
            
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Experience Stats */}
        <Card className="p-6 bg-gradient-accent text-white">
          <h3 className="text-lg font-semibold mb-4">Experience Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">40+</div>
              <div className="text-sm opacity-90">Completed Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">52+</div>
              <div className="text-sm opacity-90">Happy Clients</div>
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