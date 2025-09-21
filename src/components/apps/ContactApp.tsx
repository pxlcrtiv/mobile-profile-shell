import { MobileScreen } from '../MobileScreen';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ContactAppProps {
  onBack: () => void;
}

export const ContactApp = ({ onBack }: ContactAppProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <MobileScreen title="Contact" onBack={onBack}>
      <div className="space-y-6">
        {/* Contact Info */}
        <Card className="p-6 bg-gradient-primary text-white">
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5" />
              <span>eeddie456@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" />
              <span>Remote • Born in Nigeria</span>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5" />
              <span>Available for freelance projects</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card text-center hover:bg-card/80 transition-colors cursor-pointer">
            <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium">Email Me</span>
          </Card>
          <Card className="p-4 bg-card text-center hover:bg-card/80 transition-colors cursor-pointer">
            <ExternalLink className="w-8 h-8 mx-auto mb-2 text-accent" />
            <span className="text-sm font-medium">Portfolio</span>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-background/50"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-background/50"
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="bg-background/50 resize-none"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </Card>

        {/* Social Links */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
          <div className="space-y-3">
            <a 
              href="https://twitter.com/emmankwoh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Twitter</div>
                  <div className="text-sm text-muted-foreground">@emmankwoh</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>

            <a 
              href="https://www.linkedin.com/in/emma-en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">in/emma-en</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>

            <a 
              href="https://emmankwoh.framer.website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-warning flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Portfolio Website</div>
                  <div className="text-sm text-muted-foreground">Framer Site</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </Card>

        {/* Availability */}
        <Card className="p-6 bg-card border-accent/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
            <span className="font-medium text-success">Available for Work</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Currently accepting new projects and collaborations. Let's build something amazing together!
          </p>
        </Card>
      </div>
    </MobileScreen>
  );
};