import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

// Add missing imports and implement simulated battery percentage
export const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryPercentage, setBatteryPercentage] = useState<number>(Math.floor(Math.random() * 30) + 70); // Random between 70-99%

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate battery percentage changes
  useEffect(() => {
    // Randomly update battery percentage every 30-60 seconds
    const batteryTimer = setInterval(() => {
      setBatteryPercentage(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // Random between -2 and +2
        const newPercentage = Math.max(0, Math.min(100, prev + change));
        return newPercentage;
      });
    }, Math.floor(Math.random() * 30000) + 30000);

    return () => clearInterval(batteryTimer);
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
    // Update status bar styling to match iOS 26 - increase height, add blur, improve positioning
    <div className="status-bar fixed top-0 left-0 right-0 h-8 bg-transparent z-20 flex items-center justify-between px-5">
      <div className="flex items-center space-x-1 text-sm font-medium text-white">
        <span>{formatTime(currentTime)}</span>
      </div>
      
      <div className="flex items-center space-x-3 text-white">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center space-x-1">
          <Battery className={`w-4 h-4 ${getBatteryColor()}`} />
          <span className="text-xs font-medium">{batteryPercentage}%</span>
        </div>
      </div>
    </div>
  );
};