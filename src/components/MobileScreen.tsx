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
    <div className={cn("absolute inset-0 bg-background animate-slide-up flex flex-col z-10", className)}>
      <StatusBar />
      
      {title && (
        <div className="flex items-center justify-between px-5 py-3 mt-8 border-b border-border/20">
          {onBack ? (
            <button 
              onClick={onBack}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-150 active:scale-90"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : <div className="w-8" />}
          <h1 className="text-base font-semibold text-center flex-1">{title}</h1>
          <div className="w-8" />
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        {children}
      </div>
    </div>
  );
};
