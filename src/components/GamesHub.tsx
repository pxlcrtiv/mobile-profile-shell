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
  { id: 'snake', label: 'Snake', icon: Gamepad2, color: 'bg-gradient-to-br from-green-500 to-emerald-700' },
  { id: 'tictactoe', label: 'Tic Tac Toe', icon: Grid3X3, color: 'bg-gradient-to-br from-indigo-500 to-purple-700' },
  { id: 'tetris', label: 'Tetris', icon: Pyramid, color: 'bg-gradient-to-br from-cyan-500 to-blue-700' },
  { id: 'memory', label: 'Memory', icon: Shapes, color: 'bg-gradient-to-br from-pink-500 to-rose-700' },
  { id: 'flappy', label: 'Flappy Bird', icon: Bird, color: 'bg-gradient-to-br from-sky-500 to-cyan-700' },
  { id: 'game2048', label: '2048', icon: Grid3X3, color: 'bg-gradient-to-br from-amber-500 to-orange-700' },
  { id: 'sudoku', label: 'Sudoku', icon: Puzzle, color: 'bg-gradient-to-br from-teal-500 to-cyan-700' },
  { id: 'pong', label: 'Pong', icon: Swords, color: 'bg-gradient-to-br from-violet-500 to-fuchsia-700' },
  { id: 'spaceship', label: 'Space Shooter', icon: Rocket, color: 'bg-gradient-to-br from-blue-600 to-indigo-800' },
  { id: 'pimenta', label: 'Pimenta', icon: Flame, color: 'bg-gradient-to-br from-red-600 to-orange-600' },
  { id: 'crownfall', label: 'Crownfall', icon: ShieldCheck, color: 'bg-gradient-to-br from-amber-600 to-yellow-700' },
  { id: 'slidingpuzzle', label: 'Sliding Puzzle', icon: Puzzle, color: 'bg-gradient-to-br from-emerald-500 to-teal-700' },
];

interface GamesHubProps {
  onLaunchGame: (gameId: string) => void;
}

export const GamesHub = ({ onLaunchGame }: GamesHubProps) => {
  const { getHighScore } = useHighScores();

  return (
    <div className="pt-10 min-h-screen">
      <div className="px-5 py-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display tracking-tight">Game Center</h1>
            <p className="text-[10px] text-muted-foreground">Choose your game</p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-28">
        <div className="game-grid max-w-sm mx-auto">
          {gameList.map((game, index) => {
            const highScore = getHighScore(game.id);
            return (
              <div key={game.id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="relative" onClick={() => onLaunchGame(game.id)}>
                  <AppIcon
                    icon={game.icon}
                    label={game.label}
                    color={game.color}
                    onClick={() => {}}
                  />
                  {highScore > 0 && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-amber-500/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap leading-none">
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
