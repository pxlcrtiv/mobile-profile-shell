import { useState, useCallback } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';

interface SudokuProps {
  onBack: () => void;
}

const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard'): number[][] => {
  const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  const isValid = (g: number[][], row: number, col: number, num: number) => {
    for (let i = 0; i < 9; i++) if (g[row][i] === num) return false;
    for (let i = 0; i < 9; i++) if (g[i][col] === num) return false;
    const br = Math.floor(row / 3) * 3, bc = Math.floor(col / 3) * 3;
    for (let r = br; r < br + 3; r++) for (let c = bc; c < bc + 3; c++) if (g[r][c] === num) return false;
    return true;
  };

  const solve = (g: number[][]): boolean => {
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
      if (g[r][c] === 0) {
        const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
        for (const num of nums) {
          if (isValid(g, r, c, num)) {
            g[r][c] = num;
            if (solve(g)) return true;
            g[r][c] = 0;
          }
        }
        return false;
      }
    }
    return true;
  };

  const solution = grid.map(row => [...row]);
  solve(solution);

  const puzzle = solution.map(row => [...row]);
  const cellsToRemove = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 55;
  let removed = 0;
  while (removed < cellsToRemove) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) { puzzle[r][c] = 0; removed++; }
  }

  return puzzle;
};

const isValidMove = (grid: number[][], row: number, col: number, num: number): boolean => {
  if (!num) return true;
  for (let i = 0; i < 9; i++) if (i !== col && grid[row][i] === num) return false;
  for (let i = 0; i < 9; i++) if (i !== row && grid[i][col] === num) return false;
  const br = Math.floor(row / 3) * 3, bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++) for (let c = bc; c < bc + 3; c++) if ((r !== row || c !== col) && grid[r][c] === num) return false;
  return true;
};

export const Sudoku = ({ onBack }: SudokuProps) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [initial, setInitial] = useState<number[][]>(generatePuzzle(difficulty));
  const [grid, setGrid] = useState<number[][]>(initial.map(r => [...r]));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [completed, setCompleted] = useState(false);

  const newGame = useCallback((diff?: 'easy' | 'medium' | 'hard') => {
    const d = diff || difficulty;
    const p = generatePuzzle(d);
    setInitial(p.map(r => [...r]));
    setGrid(p.map(r => [...r]));
    setSelected(null);
    setCompleted(false);
  }, [difficulty]);

  const placeNumber = (num: number) => {
    if (!selected || completed) return;
    const [r, c] = selected;
    if (initial[r][c] !== 0) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);
    if (num && newGrid.every(row => row.every(cell => cell !== 0))) {
      setCompleted(true);
    }
  };

  return (
    <MobileScreen title="Sudoku" onBack={onBack}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as const).map(d => (
            <Button key={d} onClick={() => { setDifficulty(d); newGame(d); }} variant={difficulty === d ? 'default' : 'outline'} size="sm">
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </Button>
          ))}
        </div>

        {completed && <div className="text-green-400 font-bold">Puzzle Solved!</div>}

        <div className="bg-secondary/20 rounded-xl p-1.5">
          {grid.map((row, r) => (
            <div key={r} className="flex">
              {row.map((val, c) => {
                const isSelected = selected && selected[0] === r && selected[1] === c;
                const isInitial = initial[r][c] !== 0;
                const isError = val !== 0 && !isInitial && !isValidMove(grid, r, c, val);
                const borderR = c === 2 || c === 5;
                const borderB = r === 2 || r === 5;
                return (
                  <div key={c} onClick={() => setSelected([r, c])}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-medium cursor-pointer transition-colors
                      ${isSelected ? 'bg-indigo-500/40' : 'hover:bg-secondary/40'}
                      ${isInitial ? 'text-foreground font-bold' : 'text-blue-400'}
                      ${isError ? 'text-red-400' : ''}
                      ${borderR ? 'border-r-2 border-r-border' : ''}
                      ${borderB ? 'border-b-2 border-b-border' : ''}
                      ${r === 0 ? 'border-t border-t-border' : ''}
                      ${c === 0 ? 'border-l border-l-border' : ''}
                      border border-border/30`}>
                    {val || ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-9 gap-1 max-w-[288px]">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => placeNumber(n)}
              className="w-7 h-7 rounded-md bg-secondary/50 hover:bg-secondary text-xs font-medium transition-colors active:scale-90">
              {n}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => placeNumber(0)} variant="outline" size="sm">Erase</Button>
          <Button onClick={() => newGame()} variant="outline" size="sm">New Game</Button>
        </div>
      </div>
    </MobileScreen>
  );
};
