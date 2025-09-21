import { MobileScreen } from '../MobileScreen';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork, ExternalLink, Calendar, Github } from 'lucide-react';

interface ProjectsAppProps {
  onBack: () => void;
}

const projects = [
  {
    name: "Panorama Streetviewer",
    description: "A powerful, interactive web application that enables users to explore panoramic imagery with advanced navigation capabilities, similar to Google Street View but with custom functionality.",
    language: "JavaScript",
    topics: ["panorama-viewer"],
    updated: "4 days ago",
    license: "MIT License"
  },
  {
    name: "Adiva",
    description: "A cutting-edge, AI-powered advertising creation platform that leverages Google's Gemini AI to generate compelling ad copy and stunning visuals for multiple social media platforms.",
    language: "TypeScript",
    topics: ["image", "ads", "image-editor", "image-generation", "generative-ai"],
    updated: "2 weeks ago"
  },
  {
    name: "Sonic Dreamscape Orchestrator",
    description: "A professional-grade web application for generating healing frequencies, binaural beats, and conducting audio experiments. Built with modern web technologies for precise audio control.",
    language: "TypeScript",
    topics: ["meditation", "frequency-generator", "meditation-practice", "tone-generator"],
    updated: "2 weeks ago"
  },
  {
    name: "Activepieces",
    description: "AI Agents & MCPs & AI Workflow Automation • (~400 MCP servers for AI agents) • AI Automation / AI Agent with MCPs • AI Workflows & AI Agents • MCPs for AI Agents",
    language: "TypeScript",
    updated: "2 weeks ago",
    fork: true
  }
];

export const ProjectsApp = ({ onBack }: ProjectsAppProps) => {
  return (
    <MobileScreen title="Projects" onBack={onBack}>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index} className="p-4 bg-card hover:bg-card/80 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground">{project.name}</h3>
                  {project.fork && (
                    <GitFork className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {project.description}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
            </div>

            {project.topics && (
              <div className="flex flex-wrap gap-1 mb-3">
                {project.topics.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {project.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.topics.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded-full ${
                    project.language === 'JavaScript' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span>{project.language}</span>
                </div>
                {project.license && (
                  <span>{project.license}</span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{project.updated}</span>
              </div>
            </div>
          </Card>
        ))}

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