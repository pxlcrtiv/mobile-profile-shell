import { useState, useEffect } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

export const DynamicIsland = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div 
      className={`dynamic-island cursor-pointer transition-all duration-300 ${
        isExpanded ? 'w-64 h-20' : 'w-32 h-9'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded ? (
        <div className="flex items-center justify-between h-full px-4">
          <div className="text-left">
            <div className="text-xs text-white/70">Now Playing</div>
            <div className="text-sm font-medium">Portfolio Music</div>
          </div>
          <div className="flex items-center space-x-2">
            <Signal className="w-3 h-3 text-white/70" />
            <Wifi className="w-3 h-3 text-white/70" />
            <div className="flex items-center space-x-1">
              <Battery className="w-3 h-3 text-white/70" />
              <span className="text-xs text-white/70">87%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-sm font-medium text-white/90">
            {formatTime(currentTime)}
          </span>
        </div>
      )}
    </div>
  );
};