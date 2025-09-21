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
      className={cn("flex flex-col items-center space-y-2 cursor-pointer group", className)}
      onClick={onClick}
    >
      <div className="relative">
        <div className={`app-icon w-16 h-16 ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        {badge && (
          <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {badge > 99 ? '99+' : badge}
          </div>
        )}
      </div>
      <span className="text-xs text-center text-foreground/90 font-medium max-w-[80px] truncate">
        {label}
      </span>
    </div>
  );
};