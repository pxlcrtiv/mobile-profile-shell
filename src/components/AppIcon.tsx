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
    <div 
      className={cn("flex flex-col items-center gap-1.5 cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="relative">
        <div className={`app-icon-shell ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {badge && (
          <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[9px] font-bold px-1 shadow-lg">
            {badge > 99 ? '99+' : badge}
          </div>
        )}
      </div>
      <span className="text-[10px] text-center text-foreground/80 font-medium max-w-[64px] truncate leading-tight">
        {label}
      </span>
    </div>
  );
};
