import { useState } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { DynamicIsland } from '@/components/DynamicIsland';
import { AppIcon } from '@/components/AppIcon';
import { TabBar, TabId } from '@/components/TabBar';
import { GamesHub } from '@/components/GamesHub';
import { PortfolioHub } from '@/components/apps/PortfolioHub';
import { SnakeGameApp } from '@/components/apps/SnakeGameApp';
import { TicTacToeApp } from '@/components/apps/TicTacToeApp';
import { Tetris } from '@/components/apps/Tetris';
import { MemoryMatch } from '@/components/apps/MemoryMatch';
import { FlappyBird } from '@/components/apps/FlappyBird';
import { Game2048 } from '@/components/apps/Game2048';
import { Sudoku } from '@/components/apps/Sudoku';
import { Pong } from '@/components/apps/Pong';
import { SpaceshipShooter } from '@/components/apps/SpaceshipShooter';
import { PimentaGame } from '@/components/apps/PimentaGame';
import { Crownfall } from '@/components/apps/Crownfall';
import { SlidingPuzzle } from '@/components/apps/SlidingPuzzle';
import { CalculatorApp } from '@/components/apps/CalculatorApp';
import { ClockApp } from '@/components/apps/ClockApp';
import { WeatherApp } from '@/components/apps/WeatherApp';
import { SettingsApp } from '@/components/apps/SettingsApp';
import { QRCodeApp } from '@/components/apps/QRCodeApp';
import { MusicApp } from '@/components/apps/MusicApp';
import { MessagesApp } from '@/components/apps/MessagesApp';
import { NotesApp } from '@/components/apps/NotesApp';
import { PomodoroApp } from '@/components/apps/PomodoroApp';
import { Grid3X3, Settings, Calculator, Clock, CloudSun, Camera, Music, MessageCircle, StickyNote, Timer } from 'lucide-react';

type AppType = 'home' | 'snake' | 'tictactoe' | 'tetris' | 'memory' | 'flappy' | 'game2048' | 'sudoku' | 'pong' |
  'spaceship' | 'pimenta' | 'crownfall' | 'slidingpuzzle' |
  'calculator' | 'clock' | 'weather' | 'settings' | 'qrcode' | 'music' | 'messages' | 'notes' | 'pomodoro';

const utilities = [
  { id: 'settings' as const, label: 'Settings', icon: Settings, color: 'bg-gradient-to-br from-gray-600 to-gray-800' },
  { id: 'calculator' as const, label: 'Calculator', icon: Calculator, color: 'bg-gradient-to-br from-zinc-600 to-zinc-900' },
  { id: 'clock' as const, label: 'Clock', icon: Clock, color: 'bg-gradient-to-br from-zinc-700 to-black' },
  { id: 'weather' as const, label: 'Weather', icon: CloudSun, color: 'bg-gradient-to-br from-sky-500 to-indigo-700' },
  { id: 'qrcode' as const, label: 'QR Code', icon: Camera, color: 'bg-gradient-to-br from-blue-500 to-purple-700' },
  { id: 'music' as const, label: 'Music', icon: Music, color: 'bg-gradient-to-br from-pink-500 to-rose-700' },
  { id: 'messages' as const, label: 'Messages', icon: MessageCircle, color: 'bg-gradient-to-br from-green-500 to-emerald-700' },
  { id: 'notes' as const, label: 'Notes', icon: StickyNote, color: 'bg-gradient-to-br from-amber-500 to-yellow-700' },
  { id: 'pomodoro' as const, label: 'Pomodoro', icon: Timer, color: 'bg-gradient-to-br from-red-500 to-rose-700' },
];

const Index = () => {
  const [currentApp, setCurrentApp] = useState<AppType>('home');
  const [activeTab, setActiveTab] = useState<TabId>('games');

  const renderCurrentApp = () => {
    switch (currentApp) {
      case 'snake': return <SnakeGameApp onBack={() => setCurrentApp('home')} />;
      case 'tictactoe': return <TicTacToeApp onBack={() => setCurrentApp('home')} />;
      case 'tetris': return <Tetris onBack={() => setCurrentApp('home')} />;
      case 'memory': return <MemoryMatch onBack={() => setCurrentApp('home')} />;
      case 'flappy': return <FlappyBird onBack={() => setCurrentApp('home')} />;
      case 'game2048': return <Game2048 onBack={() => setCurrentApp('home')} />;
      case 'sudoku': return <Sudoku onBack={() => setCurrentApp('home')} />;
      case 'pong': return <Pong onBack={() => setCurrentApp('home')} />;
      case 'spaceship': return <SpaceshipShooter onBack={() => setCurrentApp('home')} />;
      case 'pimenta': return <PimentaGame onBack={() => setCurrentApp('home')} />;
      case 'crownfall': return <Crownfall onBack={() => setCurrentApp('home')} />;
      case 'slidingpuzzle': return <SlidingPuzzle onBack={() => setCurrentApp('home')} />;
      case 'calculator': return <CalculatorApp onBack={() => setCurrentApp('home')} />;
      case 'clock': return <ClockApp onBack={() => setCurrentApp('home')} />;
      case 'weather': return <WeatherApp onBack={() => setCurrentApp('home')} />;
      case 'settings': return <SettingsApp onBack={() => setCurrentApp('home')} />;
      case 'qrcode': return <QRCodeApp onBack={() => setCurrentApp('home')} />;
      case 'music': return <MusicApp onBack={() => setCurrentApp('home')} />;
      case 'messages': return <MessagesApp onBack={() => setCurrentApp('home')} />;
      case 'notes': return <NotesApp onBack={() => setCurrentApp('home')} />;
      case 'pomodoro': return <PomodoroApp onBack={() => setCurrentApp('home')} />;
      default: return null;
    }
  };

  if (currentApp !== 'home') {
    return renderCurrentApp();
  }

  return (
    <div className="min-h-screen bg-background relative">
      <StatusBar />
      <DynamicIsland />

      <div className="animate-fade-up">
        {activeTab === 'portfolio' && (
          <PortfolioHub onBack={() => setActiveTab('games')} />
        )}
        {activeTab === 'games' && (
          <GamesHub onLaunchGame={(id) => setCurrentApp(id as AppType)} />
        )}
        {activeTab === 'utilities' && (
          <div className="pt-10 min-h-screen">
            <div className="px-5 py-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg shadow-gray-500/20">
                  <Grid3X3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold font-display tracking-tight">Utilities</h1>
                  <p className="text-[10px] text-muted-foreground">Tools & apps</p>
                </div>
              </div>
            </div>

            <div className="px-5 pb-28">
              <div className="game-grid max-w-sm mx-auto">
                {utilities.map((app, index) => (
                  <div key={app.id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <AppIcon icon={app.icon} label={app.label} color={app.color} onClick={() => setCurrentApp(app.id)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
