import { Gamepad2, User, Grid3X3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabId = 'games' | 'portfolio' | 'utilities';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Gamepad2 }[] = [
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'portfolio', label: 'Portfolio', icon: User },
  { id: 'utilities', label: 'Utilities', icon: Grid3X3 },
];

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-2 pt-1 bg-gradient-to-t from-black/60 to-transparent animate-fade-in-up">
      <div className="max-w-sm mx-auto glass-card rounded-2xl px-2 py-1.5 flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-xl transition-all duration-300 relative",
                isActive ? "text-white" : "text-muted-foreground hover:text-foreground/70"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm animate-scale-in" />
              )}
              <Icon className={cn("w-5 h-5 relative z-10 transition-transform", isActive && "scale-110")} />
              <span className="text-[10px] font-medium relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
