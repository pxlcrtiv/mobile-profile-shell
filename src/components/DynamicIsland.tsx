import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Signal, BatteryCharging } from 'lucide-react';
import { useBattery } from '@/hooks/use-battery';

export const DynamicIsland = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { level: batteryPercentage, charging } = useBattery();

  // Update time every second
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

  // Determine battery icon color based on percentage
  const getBatteryColor = () => {
    if (batteryPercentage < 20) return 'text-destructive';
    if (batteryPercentage < 40) return 'text-warning';
    return 'text-white/70';
  };

  // iOS-style status info that will always be visible
  const renderStatusInfo = () => (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
      <Signal className="w-2.5 h-2.5 text-white/70" aria-hidden="true" />
      <Wifi className="w-2.5 h-2.5 text-white/70" aria-hidden="true" />
      {charging ? (
         <BatteryCharging className={`w-2.5 h-2.5 ${getBatteryColor()}`} aria-hidden="true" />
       ) : (
         <Battery className={`w-2.5 h-2.5 ${getBatteryColor()}`} aria-hidden="true" />
       )}
    </div>
  );

  return (
    <div 
      className={`dynamic-island cursor-pointer z-10 ${
        isExpanded ? 'w-64 h-20' : 'w-36 h-9' 
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      aria-label={isExpanded ? 'Collapse Dynamic Island' : 'Expand Dynamic Island'}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsExpanded(!isExpanded); } }}
    >
      {renderStatusInfo()}
      
      {isExpanded ? (
        <div className="flex items-center justify-between h-full px-4 ml-10">
          <div className="text-left">
            <div className="text-xs text-white/70">Now Playing</div>
            <div className="text-sm font-medium">Portfolio Music</div>
          </div>
          <div className="flex items-center space-x-1">
            <span className={`text-xs ${getBatteryColor()}`}>{batteryPercentage}%</span>
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