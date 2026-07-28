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
        <div className="flex items-center justify-between px-5 py-3 mt-8 border-b border-border/15 bg-background/50 backdrop-blur-sm sticky top-8 z-20">
          {onBack ? (
            <button 
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary/40 hover:bg-secondary/60 border border-border/20 transition-all duration-150 active:scale-90"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : <div className="w-9" />}
          <h1 className="text-[15px] font-semibold text-center flex-1 tracking-tight">{title}</h1>
          <div className="w-9" />
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        {children}
      </div>
    </div>
  );
};
