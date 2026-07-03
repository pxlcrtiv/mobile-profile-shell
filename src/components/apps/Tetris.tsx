import { useState, useEffect, useCallback, useRef } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';
import { useHighScores } from '@/hooks/useHighScores';

interface TetrisProps {
  onBack: () => void;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

const TETROMINOES: Record<string, { shape: number[][]; color: string }> = {
  I: { shape: [[1,1,1,1]], color: '#06b6d4' },
  O: { shape: [[1,1],[1,1]], color: '#eab308' },
  T: { shape: [[0,1,0],[1,1,1]], color: '#a855f7' },
  S: { shape: [[0,1,1],[1,1,0]], color: '#22c55e' },
  Z: { shape: [[1,1,0],[0,1,1]], color: '#ef4444' },
  J: { shape: [[1,0,0],[1,1,1]], color: '#3b82f6' },
  L: { shape: [[0,0,1],[1,1,1]], color: '#f97316' },
};

const PIECES = Object.keys(TETROMINOES);

const createBoard = () => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(''));

const randomPiece = () => {
  const id = PIECES[Math.floor(Math.random() * PIECES.length)];
  return { id, ...TETROMINOES[id], shape: TETROMINOES[id].shape.map(row => [...row]), x: Math.floor((BOARD_WIDTH - TETROMINOES[id].shape[0].length) / 2), y: 0 };
};

const rotate = (shape: number[][]) => shape[0].map((_, i) => shape.map(row => row[i]).reverse());

export const Tetris = ({ onBack }: TetrisProps) => {
  const [board, setBoard] = useState(createBoard());
  const [current, setCurrent] = useState(randomPiece());
  const [nextPiece, setNextPiece] = useState(randomPiece());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScoreReached, setHighScoreReached] = useState(false);
  const { addScore, getHighScore, isNewHighScore } = useHighScores();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dropInterval = Math.max(50, 500 - (level - 1) * 40);

  const isValid = useCallback((shape: number[][], offsetX: number, offsetY: number) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = offsetX + x;
          const newY = offsetY + y;
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (newY >= 0 && board[newY][newX])) return false;
        }
      }
    }
    return true;
  }, [board]);

  const mergePiece = useCallback(() => {
    const newBoard = board.map(row => [...row]);
    const shape = current.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] && current.y + y >= 0) {
          newBoard[current.y + y][current.x + x] = current.color;
        }
      }
    }

    let cleared = 0;
    const finalBoard = newBoard.filter(row => {
      if (row.every(cell => cell !== '')) { cleared++; return false; }
      return true;
    });
    while (finalBoard.length < BOARD_HEIGHT) finalBoard.unshift(Array(BOARD_WIDTH).fill(''));

    if (cleared > 0) {
      const points = [0, 100, 300, 500, 800][cleared] || 800;
      setScore(s => s + points * level);
      setLines(l => {
        const newLines = l + cleared;
        setLevel(Math.floor(newLines / 10) + 1);
        return newLines;
      });
    }

    setBoard(finalBoard);
    setCurrent({ ...nextPiece, x: Math.floor((BOARD_WIDTH - nextPiece.shape[0].length) / 2), y: 0 });
    setNextPiece(randomPiece());

    if (!isValid(nextPiece.shape, Math.floor((BOARD_WIDTH - nextPiece.shape[0].length) / 2), 0)) {
      setGameRunning(false);
      setGameOver(true);
      addScore('tetris', score);
      if (isNewHighScore('tetris', score)) setHighScoreReached(true);
    }
  }, [board, current, nextPiece, isValid, level, score, addScore, isNewHighScore]);

  const moveDown = useCallback(() => {
    if (!gameRunning) return;
    if (isValid(current.shape, current.x, current.y + 1)) {
      setCurrent(c => ({ ...c, y: c.y + 1 }));
    } else {
      mergePiece();
    }
  }, [gameRunning, current, isValid, mergePiece]);

  const moveHoriz = useCallback((dir: number) => {
    if (!gameRunning || gameOver) return;
    if (isValid(current.shape, current.x + dir, current.y)) {
      setCurrent(c => ({ ...c, x: c.x + dir }));
    }
  }, [gameRunning, gameOver, current, isValid]);

  const rotatePiece = useCallback(() => {
    if (!gameRunning || gameOver) return;
    const rotated = rotate(current.shape);
    if (isValid(rotated, current.x, current.y)) {
      setCurrent(c => ({ ...c, shape: rotated }));
    } else if (isValid(rotated, current.x - 1, current.y)) {
      setCurrent(c => ({ ...c, shape: rotated, x: c.x - 1 }));
    } else if (isValid(rotated, current.x + 1, current.y)) {
      setCurrent(c => ({ ...c, shape: rotated, x: c.x + 1 }));
    }
  }, [gameRunning, gameOver, current, isValid]);

  const hardDrop = useCallback(() => {
    if (!gameRunning) return;
    let dropY = current.y;
    while (isValid(current.shape, current.x, dropY + 1)) dropY++;
    setCurrent(c => ({ ...c, y: dropY }));
    mergePiece();
  }, [gameRunning, current, isValid, mergePiece]);

  const startGame = () => {
    setBoard(createBoard());
    setCurrent(randomPiece());
    setNextPiece(randomPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setHighScoreReached(false);
    setGameRunning(true);
  };

  useEffect(() => {
    if (!gameRunning) return;
    const interval = setInterval(moveDown, dropInterval);
    return () => clearInterval(interval);
  }, [gameRunning, moveDown, dropInterval]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveHoriz(-1);
      else if (e.key === 'ArrowRight') moveHoriz(1);
      else if (e.key === 'ArrowDown') moveDown();
      else if (e.key === 'ArrowUp') rotatePiece();
      else if (e.key === ' ') { e.preventDefault(); hardDrop(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [moveHoriz, moveDown, rotatePiece, hardDrop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'hsl(235 25% 13%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[y][x]) {
          ctx.fillStyle = board[y][x];
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
          ctx.fillStyle = 'rgba(255,255,255,0.15)';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, 2);
        }
      }
    }

    const shape = current.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] && current.y + y >= 0) {
          ctx.fillStyle = current.color;
          ctx.fillRect((current.x + x) * CELL_SIZE, (current.y + y) * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fillRect((current.x + x) * CELL_SIZE, (current.y + y) * CELL_SIZE, CELL_SIZE - 1, 2);
        }
      }
    }
  }, [board, current]);

  return (
    <MobileScreen title="Tetris" onBack={onBack}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-between w-full max-w-[200px]">
          <div className="text-center"><div className="text-xs text-muted-foreground">Score</div><div className="text-lg font-bold">{score}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Level</div><div className="text-lg font-bold">{level}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Lines</div><div className="text-lg font-bold">{lines}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Best</div><div className="text-lg font-bold">{getHighScore('tetris')}</div></div>
        </div>

        {highScoreReached && <div className="text-amber-400 font-bold text-sm animate-bounce">New High Score!</div>}
        {gameOver && <div className="text-red-500 font-bold">Game Over!</div>}

        <div className="relative">
          <canvas ref={canvasRef} width={BOARD_WIDTH * CELL_SIZE} height={BOARD_HEIGHT * CELL_SIZE} className="rounded-xl border border-border/30" />
          {!gameRunning && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
              <Button onClick={startGame} size="lg">Start Game</Button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => moveHoriz(-1)} variant="outline" size="sm" disabled={!gameRunning}>←</Button>
          <Button onClick={rotatePiece} variant="outline" size="sm" disabled={!gameRunning}>↻</Button>
          <Button onClick={() => moveHoriz(1)} variant="outline" size="sm" disabled={!gameRunning}>→</Button>
          <Button onClick={hardDrop} variant="outline" size="sm" disabled={!gameRunning}>↓</Button>
        </div>

        {gameRunning && <Button onClick={() => setGameRunning(false)} variant="outline" size="sm">Pause</Button>}
        {!gameRunning && gameOver && <Button onClick={startGame} size="sm">Play Again</Button>}
      </div>
    </MobileScreen>
  );
};
