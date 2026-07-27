import { AppIcon } from '@/components/AppIcon';
import { Gamepad2, Grid3X3, Pyramid, Bird, Shapes, Puzzle, Swords, Rocket, Flame, ShieldCheck, Github } from 'lucide-react';
import { useHighScores } from '@/hooks/useHighScores';

interface GameEntry {
  id: string;
  label: string;
  icon: typeof Gamepad2;
  color: string;
}

const gameList: GameEntry[] = [
  { id: 'snake', label: 'Snake', icon: Gamepad2, color: 'bg-gradient-to-br from-green-500 to-emerald-700' },
  { id: 'tictactoe', label: 'Tic Tac Toe', icon: Grid3X3, color: 'bg-gradient-to-br from-emerald-500 to-green-700' },
  { id: 'tetris', label: 'Tetris', icon: Pyramid, color: 'bg-gradient-to-br from-cyan-500 to-blue-700' },
  { id: 'memory', label: 'Memory', icon: Shapes, color: 'bg-gradient-to-br from-pink-500 to-rose-700' },
  { id: 'flappy', label: 'Flappy Bird', icon: Bird, color: 'bg-gradient-to-br from-sky-500 to-cyan-700' },
  { id: 'game2048', label: '2048', icon: Grid3X3, color: 'bg-gradient-to-br from-amber-500 to-orange-700' },
  { id: 'sudoku', label: 'Sudoku', icon: Puzzle, color: 'bg-gradient-to-br from-teal-500 to-cyan-700' },
  { id: 'pong', label: 'Pong', icon: Swords, color: 'bg-gradient-to-br from-teal-500 to-emerald-700' },
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
      <div className="px-5 py-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(var(--coloros-green))] to-[hsl(var(--coloros-blue))] flex items-center justify-center shadow-lg shadow-primary/20">
              <Gamepad2 className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display tracking-tight">Game Center</h1>
              <p className="text-[11px] text-muted-foreground">Choose your game</p>
            </div>
          </div>
          <a
            href="https://github.com/pxlcrtiv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-primary/10 ring-1 ring-primary/25 px-2.5 py-1 text-[10px] font-semibold text-primary hover:bg-primary/15 transition-all duration-200"
            aria-label="Signed in as pxlcrtiv on GitHub"
          >
            <Github className="w-3 h-3" />pxlcrtiv
          </a>
        </div>
      </div>

      <div className="px-5 pb-28">
        <div className="game-grid max-w-sm mx-auto">
          {gameList.map((game, index) => {
            const highScore = getHighScore(game.id);
            return (
              <div key={game.id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                <AppIcon
                  icon={game.icon}
                  label={game.label}
                  color={game.color}
                  onClick={() => onLaunchGame(game.id)}
                  badge={highScore > 0 ? highScore : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
