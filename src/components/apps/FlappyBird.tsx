import { useState, useEffect, useCallback, useRef } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';
import { useHighScores } from '@/hooks/useHighScores';

interface FlappyBirdProps {
  onBack: () => void;
}

const WIDTH = 300;
const HEIGHT = 500;
const GRAVITY = 0.4;
const JUMP = -7;
const PIPE_WIDTH = 40;
const PIPE_GAP = 130;
const PIPE_SPEED = 2.5;

export const FlappyBird = ({ onBack }: FlappyBirdProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScoreReached, setHighScoreReached] = useState(false);
  const { addScore, getHighScore, isNewHighScore } = useHighScores();
  const birdRef = useRef({ x: 60, y: HEIGHT / 2, vy: 0 });
  const pipesRef = useRef<{ x: number; top: number; scored?: boolean }[]>([]);
  const scoreRef = useRef(0);

  const reset = useCallback(() => {
    birdRef.current = { x: 60, y: HEIGHT / 2, vy: 0 };
    pipesRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setHighScoreReached(false);
  }, []);

  const jump = () => {
    if (!gameRunning && !gameOver) {
      reset();
      setGameRunning(true);
      birdRef.current.vy = JUMP;
      pipesRef.current = [{ x: WIDTH, top: Math.random() * (HEIGHT - PIPE_GAP - 60) + 30 }];
      return;
    }
    if (gameRunning) birdRef.current.vy = JUMP;
  };

  const endGame = useCallback(() => {
    setGameRunning(false);
    setGameOver(true);
    const finalScore = scoreRef.current;
    setScore(finalScore);
    addScore('flappy', finalScore);
    if (isNewHighScore('flappy', finalScore)) setHighScoreReached(true);
  }, [addScore, isNewHighScore]);

  useEffect(() => {
    if (!gameRunning) return;
    const interval = setInterval(() => {
      const bird = birdRef.current;
      bird.vy += GRAVITY;
      bird.y += bird.vy;

      if (bird.y < 0 || bird.y > HEIGHT) { endGame(); return; }

      const pipes = pipesRef.current;
      if (pipes.length === 0 || pipes[pipes.length - 1].x < WIDTH - 180) {
        pipes.push({ x: WIDTH, top: Math.random() * (HEIGHT - PIPE_GAP - 60) + 30 });
      }

      for (const pipe of pipes) {
        pipe.x -= PIPE_SPEED;
        if (bird.x + 15 > pipe.x && bird.x - 15 < pipe.x + PIPE_WIDTH) {
          if (bird.y - 12 < pipe.top || bird.y + 12 > pipe.top + PIPE_GAP) {
            endGame();
            return;
          }
        }
        if (pipe.x + PIPE_WIDTH < bird.x && !pipe.scored) {
          pipe.scored = true;
          scoreRef.current++;
          setScore(scoreRef.current);
        }
      }

      if (pipes.length > 0 && pipes[0].x < -PIPE_WIDTH) pipes.shift();
    }, 16);
    return () => clearInterval(interval);
  }, [gameRunning, endGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = 'hsl(235 25% 10%)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const bird = birdRef.current;
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(bird.x + 5, bird.y - 3, 3, 0, Math.PI * 2);
    ctx.fill();

    for (const pipe of pipesRef.current) {
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
      ctx.fillRect(pipe.x, pipe.top + PIPE_GAP, PIPE_WIDTH, HEIGHT - pipe.top - PIPE_GAP);
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(pipe.x - 3, pipe.top - 20, PIPE_WIDTH + 6, 20);
      ctx.fillRect(pipe.x - 3, pipe.top + PIPE_GAP, PIPE_WIDTH + 6, 20);
    }
  }, [birdRef.current.y, pipesRef.current, score]);

  return (
    <MobileScreen title="Flappy Bird" onBack={onBack}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-between w-full max-w-[300px]">
          <div className="text-center"><div className="text-xs text-muted-foreground">Score</div><div className="text-lg font-bold">{score}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Best</div><div className="text-lg font-bold">{getHighScore('flappy')}</div></div>
        </div>

        {highScoreReached && <div className="text-amber-400 font-bold text-sm animate-bounce">New High Score!</div>}
        {gameOver && <div className="text-red-500 font-bold">Game Over!</div>}

        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="rounded-xl border border-border/30 cursor-pointer" onClick={jump} />

        <div className="text-xs text-muted-foreground">Click/tap to flap • Avoid pipes</div>
        {gameOver && <Button onClick={reset} size="sm">Play Again</Button>}
      </div>
    </MobileScreen>
  );
};
