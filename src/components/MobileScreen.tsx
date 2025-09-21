import React from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileScreenProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  className?: string;
}

export const MobileScreen = ({ children, title, onBack, className }: MobileScreenProps) => {
  return (
    <div className={cn("fixed inset-0 bg-app-background slide-up flex flex-col", className)}>
      <StatusBar />
      
      {title && (
        <div className="flex items-center justify-between px-6 py-4 mt-12 border-b border-border/20">
          {onBack && (
            <button 
              onClick={onBack}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-center flex-1">{title}</h1>
          {onBack && <div className="w-8" />}
        </div>
      )}
      
      {/* Make content area fully scrollable with proper padding */}
      <div className="flex-1 overflow-y-auto p-6 pb-20">
        {children}
      </div>
    </div>
  );
};