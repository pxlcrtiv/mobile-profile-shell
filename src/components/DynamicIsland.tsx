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
      hour12: true,
      hourCycle: 'h12'
    });
  };

  // iOS-style status info that will always be visible
  const renderStatusInfo = () => (
    <div className="absolute left-2 top-1 flex items-center space-x-1.5 text-white/70">
      <Signal className="w-2.5 h-2.5" />
      <Wifi className="w-2.5 h-2.5" />
      <Battery className="w-2.5 h-2.5" />
    </div>
  );

  return (
    <div 
      className={`dynamic-island cursor-pointer transition-all duration-300 z-20 ${
        isExpanded ? 'w-64 h-20' : 'w-36 h-9'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {renderStatusInfo()}
      
      {isExpanded ? (
        <div className="flex items-center justify-between h-full px-4 ml-10">
          <div className="text-left">
            <div className="text-xs text-white/70">Now Playing</div>
            <div className="text-sm font-medium">Portfolio Music</div>
          </div>
          <div className="flex items-center space-x-1 text-white/70">
            <span className="text-xs">87%</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full ml-10">
          <span className="text-sm font-medium text-white/90">
            {formatTime(currentTime)}
          </span>
        </div>
      )}
    </div>
  );
};