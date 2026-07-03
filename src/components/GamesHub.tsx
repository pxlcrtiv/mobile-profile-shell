import { AppIcon } from '@/components/AppIcon';
import { Gamepad2, Grid3X3, Pyramid, Bird, Shapes, Puzzle, Swords, Rocket, Flame, ShieldCheck } from 'lucide-react';
import { useHighScores } from '@/hooks/useHighScores';

interface GameEntry {
  id: string;
  label: string;
  icon: typeof Gamepad2;
  color: string;
}

const gameList: GameEntry[] = [
  { id: 'snake', label: 'Snake', icon: Gamepad2, color: 'bg-gradient-to-br from-green-400 via-emerald-500 to-green-600' },
  { id: 'tictactoe', label: 'Tic Tac Toe', icon: Grid3X3, color: 'bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-600' },
  { id: 'tetris', label: 'Tetris', icon: Pyramid, color: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600' },
  { id: 'memory', label: 'Memory', icon: Shapes, color: 'bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600' },
  { id: 'flappy', label: 'Flappy Bird', icon: Bird, color: 'bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-600' },
  { id: 'game2048', label: '2048', icon: Grid3X3, color: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-600' },
  { id: 'sudoku', label: 'Sudoku', icon: Puzzle, color: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600' },
  { id: 'pong', label: 'Pong', icon: Swords, color: 'bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600' },
  { id: 'spaceship', label: 'Space Shooter', icon: Rocket, color: 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-800' },
  { id: 'pimenta', label: 'Pimenta', icon: Flame, color: 'bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500' },
  { id: 'crownfall', label: 'Crownfall', icon: ShieldCheck, color: 'bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-800' },
  { id: 'slidingpuzzle', label: 'Sliding Puzzle', icon: Puzzle, color: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-green-600' },
];

interface GamesHubProps {
  onLaunchGame: (gameId: string) => void;
}

export const GamesHub = ({ onLaunchGame }: GamesHubProps) => {
  const { getHighScore } = useHighScores();

  return (
    <div className="pt-12 min-h-screen">
      <div className="text-center py-6 px-6">
        <div className="relative inline-flex mb-3 bounce-in">
          <div className="absolute inset-0 rounded-full bg-gradient-primary blur-xl opacity-60 animate-pulse" />
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary ring-2 ring-white/20">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
          Game Center
        </h1>
      </div>

      <div className="px-6 pb-24">
        <div className="app-grid max-w-sm mx-auto">
          {gameList.map((game, index) => {
            const Icon = game.icon;
            const highScore = getHighScore(game.id);
            return (
              <div key={game.id} className="bounce-in" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="relative" onClick={() => onLaunchGame(game.id)}>
                  <AppIcon
                    icon={Icon}
                    label={game.label}
                    color={game.color}
                    onClick={() => {}}
                  />
                  {highScore > 0 && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                      {highScore}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
