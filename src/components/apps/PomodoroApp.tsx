import { useState, useEffect, useCallback } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

interface PomodoroAppProps {
  onBack: () => void;
}

export const PomodoroApp = ({ onBack }: PomodoroAppProps) => {
  const [settings, setSettings] = useLocalStorage('pomodoro-settings', { focus: 25, break: 5, longBreak: 15 });
  const [totalSessions, setTotalSessions] = useLocalStorage('pomodoro-sessions', 0);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(totalSessions);
  const [editMode, setEditMode] = useState(false);

  const switchMode = useCallback((newMode: 'focus' | 'break') => {
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? settings.focus * 60 : settings.break * 60);
    setRunning(false);
  }, [settings]);

  const tick = useCallback(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        if (mode === 'focus') {
          setSessions(s => { const ns = s + 1; setTotalSessions(ns); return ns; });
          setMode('break');
          return settings.break * 60;
        } else {
          setMode('focus');
          return settings.focus * 60;
        }
      }
      return prev - 1;
    });
  }, [mode, settings]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [running, tick]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus'
    ? 1 - timeLeft / (settings.focus * 60)
    : 1 - timeLeft / (settings.break * 60);

  return (
    <MobileScreen title="Pomodoro" onBack={onBack}>
      <div className="flex flex-col items-center space-y-8 py-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold tabular-nums">{formatTime(timeLeft)}</div>
            <div className="text-xs text-muted-foreground mt-1 capitalize">{mode}</div>
          </div>
        </div>

        {mode === 'focus' ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Focus Time</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted-foreground">Break Time</span>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={() => setRunning(!running)} size="lg" className="w-32">
            {running ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Start</>}
          </Button>
          <Button onClick={() => { setRunning(false); setTimeLeft(settings.focus * 60); setMode('focus'); }} variant="outline" size="icon">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => switchMode('focus')} variant={mode === 'focus' ? 'default' : 'outline'} size="sm">Focus</Button>
          <Button onClick={() => switchMode('break')} variant={mode === 'break' ? 'default' : 'outline'} size="sm">Break</Button>
        </div>

        <div className="card-ui rounded-xl px-6 py-3 flex items-center gap-3">
          <TimerIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sessions completed:</span>
          <span className="text-lg font-bold">{sessions}</span>
        </div>

        <button onClick={() => setEditMode(!editMode)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          {editMode ? 'Done' : 'Customize timer'}
        </button>

        {editMode && (
          <div className="card-ui rounded-xl p-4 space-y-3 w-full max-w-xs">
            {(['focus', 'break', 'longBreak'] as const).map(key => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm capitalize">{key.replace('long', 'Long ')} (min)</label>
                <input type="number" min={1} max={60} value={settings[key]}
                  onChange={e => setSettings(prev => ({ ...prev, [key]: Math.max(1, parseInt(e.target.value) || 1) }))}
                  className="w-16 px-2 py-1 rounded-lg bg-secondary/50 border border-border/30 text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileScreen>
  );
};
