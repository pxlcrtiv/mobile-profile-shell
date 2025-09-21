import { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const StatusBar = () => {
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
    <div className="status-bar fixed top-0 left-0 right-0 h-6 bg-transparent z-10 flex items-center justify-between px-4 opacity-0">
      <div className="flex items-center space-x-1 text-sm font-medium text-white/70">
        <span>{formatTime(currentTime)}</span>
      </div>
      
      <div className="flex items-center space-x-2 text-white/70">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <div className="flex items-center space-x-1">
          <Battery className="w-3 h-3" />
          <span className="text-xs">87%</span>
        </div>
      </div>
    </div>
  );
};