import React, { useState, useEffect } from 'react';
import { Wifi, Battery, BatteryCharging, Signal } from 'lucide-react';
import { useBattery } from '@/hooks/use-battery';

export const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { level: batteryPercentage, charging } = useBattery();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time in 24-hour format for iOS style
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Determine battery icon color based on percentage
  const getBatteryColor = () => {
    if (batteryPercentage < 20) return 'text-destructive';
    if (batteryPercentage < 40) return 'text-warning';
    return 'text-white';
  };

  return (
    <div className="status-bar" role="status" aria-live="polite">
      <div className="flex items-center space-x-1.5 text-sm font-semibold text-white">
        <span className="tabular-nums">{formatTime(currentTime)}</span>
      </div>
      
      <div className="flex items-center space-x-2.5 text-white">
        <Signal className="w-4 h-4" aria-hidden="true" />
        <Wifi className="w-4 h-4" aria-hidden="true" />
        <div className="flex items-center space-x-1">
          {charging ? (
            <BatteryCharging className={`w-4 h-4 ${getBatteryColor()}`} aria-hidden="true" />
          ) : (
            <Battery className={`w-4 h-4 ${getBatteryColor()}`} aria-hidden="true" />
          )}
          <span className="text-xs font-medium tabular-nums">{batteryPercentage}%</span>
        </div>
      </div>
    </div>
  );
};