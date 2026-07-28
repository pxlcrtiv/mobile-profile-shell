import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onClick: () => void;
  badge?: number;
  className?: string;
}

export const AppIcon = ({ icon: Icon, label, color, onClick, badge, className }: AppIconProps) => {
  return (
    <button
      className={cn("flex flex-col items-center gap-2 cursor-pointer touch-target group", className)}
      onClick={onClick}
      aria-label={label}
    >
      <div className="relative">
        <div className={`app-icon-shell ${color} press-scale press-opacity group-hover:scale-105 transition-transform duration-150`}>
          <Icon className="w-7 h-7 text-white drop-shadow-sm" aria-hidden="true" />
        </div>
        {badge && (
          <div className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-[9px] font-bold px-1 shadow-lg animate-scale-in ring-2 ring-background">
            {badge > 99 ? '99+' : badge}
          </div>
        )}
      </div>
      <span className="text-[11px] text-center text-foreground/75 font-medium max-w-[68px] truncate leading-tight group-hover:text-foreground/90 transition-colors">
        {label}
      </span>
    </button>
  );
};
