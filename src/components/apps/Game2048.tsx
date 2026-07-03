import { useState, useEffect, useCallback } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';
import { useHighScores } from '@/hooks/useHighScores';

interface Game2048Props {
  onBack: () => void;
}

const EMPTY: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));

const TILE_COLORS: Record<number, string> = {
  0: 'bg-secondary/20',
  2: 'bg-indigo-900/40 text-white',
  4: 'bg-indigo-800/50 text-white',
  8: 'bg-violet-700/60 text-white',
  16: 'bg-purple-600/70 text-white',
  32: 'bg-fuchsia-600/70 text-white',
  64: 'bg-pink-600/70 text-white',
  128: 'bg-rose-500/80 text-white text-sm',
  256: 'bg-red-500/80 text-white text-sm',
  512: 'bg-orange-500/80 text-white text-sm',
  1024: 'bg-amber-500/80 text-white text-xs',
  2048: 'bg-yellow-400/90 text-black text-xs',
};

const addRandom = (grid: number[][]): number[][] => {
  const empty: { r: number; c: number }[] = [];
  grid.forEach((row, r) => row.forEach((val, c) => { if (!val) empty.push({ r, c }); }));
  if (!empty.length) return grid;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  const newGrid = grid.map(row => [...row]);
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
};

const slide = (row: number[]): { row: number[]; score: number } => {
  const filtered = row.filter(v => v);
  const newRow: number[] = [];
  let score = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      newRow.push(filtered[i] * 2);
      score += filtered[i] * 2;
      i++;
    } else {
      newRow.push(filtered[i]);
    }
  }
  while (newRow.length < 4) newRow.push(0);
  return { row: newRow, score };
};

export const Game2048 = ({ onBack }: Game2048Props) => {
  const [grid, setGrid] = useState(addRandom(addRandom(EMPTY.map(r => [...r]))));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const { addScore, getHighScore, isNewHighScore } = useHighScores();
  const [highScoreReached, setHighScoreReached] = useState(false);

  type Dir = 'left' | 'right' | 'up' | 'down';
  const move = useCallback((dir: Dir) => {
    if (gameOver || won) return;
    let newGrid = grid.map(row => [...row]);
    let totalScore = 0;
    let changed = false;

    const processRow = (row: number[]) => {
      if (dir === 'right') row.reverse();
      const result = slide(row);
      if (dir === 'right') result.row.reverse();
      return result;
    };

    if (dir === 'left' || dir === 'right') {
      for (let r = 0; r < 4; r++) {
        const result = processRow(grid[r]);
        newGrid[r] = result.row;
        totalScore += result.score;
        if (result.row.join(',') !== grid[r].join(',')) changed = true;
      }
    } else {
      for (let c = 0; c < 4; c++) {
        const col = grid.map(r => r[c]);
        const result = processRow(col);
        for (let r = 0; r < 4; r++) {
          newGrid[r][c] = result.row[r];
          if (result.row[r] !== grid[r][c]) changed = true;
        }
        totalScore += result.score;
      }
    }

    if (changed) {
      newGrid = addRandom(newGrid);
      setScore(s => {
        const ns = s + totalScore;
        if (ns > best) setBest(ns);
        return ns;
      });
      newGrid.flat().forEach(v => { if (v >= 2048) setWon(true); });
      const empty = newGrid.flat().filter(v => !v).length;
      if (!empty) {
        const canMove = (g: number[][]) => {
          for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
            if (c < 3 && g[r][c] === g[r][c + 1]) return true;
            if (r < 3 && g[r][c] === g[r + 1][c]) return true;
          }
          return false;
        };
        if (!canMove(newGrid)) {
          setGameOver(true);
          const finalScore = score + totalScore;
          addScore('game2048', finalScore);
          if (isNewHighScore('game2048', finalScore)) setHighScoreReached(true);
        }
      }
      setGrid(newGrid);
    }
  }, [grid, gameOver, won, best, addScore, isNewHighScore]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.startsWith('Arrow')) { e.preventDefault(); move(e.key.slice(5).toLowerCase() as Dir); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  const startGame = () => {
    setGrid(addRandom(addRandom(EMPTY.map(r => [...r]))));
    setScore(0);
    setGameOver(false);
    setWon(false);
    setHighScoreReached(false);
  };

  return (
    <MobileScreen title="2048" onBack={onBack}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-between w-full max-w-xs">
          <div className="text-center"><div className="text-xs text-muted-foreground">Score</div><div className="text-lg font-bold">{score}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Best</div><div className="text-lg font-bold">{getHighScore('game2048') || best}</div></div>
        </div>

        {highScoreReached && <div className="text-amber-400 font-bold text-sm animate-bounce">New High Score!</div>}
        {gameOver && <div className="text-red-500 font-bold">Game Over!</div>}
        {won && <div className="text-green-400 font-bold">You Win!</div>}

        <div className="bg-secondary/20 rounded-xl p-2">
          {grid.map((row, r) => (
            <div key={r} className="flex gap-2 mb-2 last:mb-0">
              {row.map((val, c) => (
                <div key={c} className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold ${TILE_COLORS[val] || TILE_COLORS[2048]}`}>
                  {val || ''}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">Arrow keys to move</div>
        <div className="flex gap-2">
          <Button onClick={() => move('left')} variant="outline" size="sm">←</Button>
          <Button onClick={() => move('down')} variant="outline" size="sm">↓</Button>
          <Button onClick={() => move('up')} variant="outline" size="sm">↑</Button>
          <Button onClick={() => move('right')} variant="outline" size="sm">→</Button>
        </div>
        <Button onClick={startGame} variant="outline" size="sm">New Game</Button>
      </div>
    </MobileScreen>
  );
};
