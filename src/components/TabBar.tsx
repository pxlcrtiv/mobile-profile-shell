import { Gamepad2, User, Grid3X3, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabId = 'games' | 'portfolio' | 'utilities';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'portfolio', label: 'Portfolio', icon: User },
  { id: 'utilities', label: 'Utilities', icon: Grid3X3 },
];

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-safe pt-1 bg-gradient-to-t from-background/80 to-transparent">
      <div className="max-w-sm mx-auto tab-bar rounded-2xl px-2 py-1.5 flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2.5 px-4 rounded-2xl transition-all duration-200 relative touch-target min-w-[72px] min-h-[48px]",
                "press-scale press-opacity",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground/80"
              )}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-2xl bg-primary/15 ring-1 ring-primary/30 animate-scale-in" aria-hidden="true" />
              )}
              <Icon className={cn("w-5 h-5 relative z-10 transition-transform", isActive && "scale-110")} aria-hidden="true" />
              <span className="text-[9px] font-semibold relative z-10 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
