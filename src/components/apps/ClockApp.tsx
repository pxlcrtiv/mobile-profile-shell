import { useState, useEffect } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Clock, Timer, Play, AlarmClock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClockAppProps {
  onBack: () => void;
}

export const ClockApp = ({ onBack }: ClockAppProps) => {
  const [activeTab, setActiveTab] = useState<'clock' | 'alarm' | 'stopwatch' | 'timer'>('clock');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(300); // 5 minutes default
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(time => time + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(time => time - 1);
      }, 1000);
    } else if (timerTime === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerTime]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const TabButton = ({ tab, icon: Icon, label }: { tab: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
        activeTab === tab ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
      }`}
    >
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs">{label}</span>
    </button>
  );

  return (
    <MobileScreen title="Clock" onBack={onBack}>
      <div className="flex flex-col h-full">
        {/* Tab Bar */}
        <div className="flex justify-around p-4 border-b border-border/20">
          <TabButton tab="clock" icon={Clock} label="Clock" />
          <TabButton tab="alarm" icon={AlarmClock} label="Alarm" />
          <TabButton tab="stopwatch" icon={Play} label="Stopwatch" />
          <TabButton tab="timer" icon={Timer} label="Timer" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {activeTab === 'clock' && (
            <div className="text-center">
              <div className="text-7xl font-light mb-4">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false
                })}
              </div>
              <div className="text-2xl text-muted-foreground mb-8">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-xl">
                  <div className="text-sm text-muted-foreground">London</div>
                  <div className="text-xl">
                    {new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="p-4 bg-card rounded-xl">
                  <div className="text-sm text-muted-foreground">Tokyo</div>
                  <div className="text-xl">
                    {new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stopwatch' && (
            <div className="text-center">
              <div className="text-7xl font-light mb-8">
                {formatTime(stopwatchTime)}
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    setStopwatchTime(0);
                    setStopwatchRunning(false);
                  }}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => setStopwatchRunning(!stopwatchRunning)}
                  size="lg"
                  className="px-8"
                >
                  {stopwatchRunning ? 'Stop' : 'Start'}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'timer' && (
            <div className="text-center">
              <div className="text-7xl font-light mb-8">
                {formatTimer(timerTime)}
              </div>
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  onClick={() => setTimerTime(Math.max(0, timerTime - 60))}
                  variant="outline"
                  disabled={timerRunning}
                >
                  -1m
                </Button>
                <Button
                  onClick={() => setTimerTime(timerTime + 60)}
                  variant="outline"
                  disabled={timerRunning}
                >
                  +1m
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    setTimerTime(300);
                    setTimerRunning(false);
                  }}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => setTimerRunning(!timerRunning)}
                  size="lg"
                  className="px-8"
                  disabled={timerTime === 0}
                >
                  {timerRunning ? 'Pause' : 'Start'}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'alarm' && (
            <div className="text-center">
              <div className="text-2xl mb-6">No alarms set</div>
              <Button size="lg">Add Alarm</Button>
            </div>
          )}
        </div>
      </div>
    </MobileScreen>
  );
};