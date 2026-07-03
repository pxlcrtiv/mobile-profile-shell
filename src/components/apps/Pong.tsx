import { useState, useEffect, useRef, useCallback } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';
import { useHighScores } from '@/hooks/useHighScores';

interface PongProps {
  onBack: () => void;
}

const WIDTH = 400;
const HEIGHT = 300;
const PADDLE_W = 8;
const PADDLE_H = 50;
const BALL_SIZE = 6;
const BALL_SPEED = 3.5;
const AI_SPEED = 3;

export const Pong = ({ onBack }: PongProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScoreReached, setHighScoreReached] = useState(false);
  const { addScore, getHighScore, isNewHighScore } = useHighScores();

  const ballRef = useRef({ x: WIDTH / 2, y: HEIGHT / 2, vx: BALL_SPEED, vy: BALL_SPEED * 0.5 });
  const playerRef = useRef(HEIGHT / 2 - PADDLE_H / 2);
  const aiRef = useRef(HEIGHT / 2 - PADDLE_H / 2);
  const playerScoreRef = useRef(0);
  const aiScoreRef = useRef(0);

  const resetBall = () => {
    ballRef.current = { x: WIDTH / 2, y: HEIGHT / 2, vx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1), vy: (Math.random() - 0.5) * BALL_SPEED };
  };

  const startGame = useCallback(() => {
    playerScoreRef.current = 0;
    aiScoreRef.current = 0;
    playerRef.current = HEIGHT / 2 - PADDLE_H / 2;
    aiRef.current = HEIGHT / 2 - PADDLE_H / 2;
    resetBall();
    setScore(0);
    setGameOver(false);
    setHighScoreReached(false);
    setGameRunning(true);
  }, []);

  const endGame = useCallback(() => {
    setGameRunning(false);
    setGameOver(true);
    const finalScore = playerScoreRef.current;
    setScore(finalScore);
    addScore('pong', finalScore);
    if (isNewHighScore('pong', finalScore)) setHighScoreReached(true);
  }, [addScore, isNewHighScore]);

  useEffect(() => {
    if (!gameRunning) return;
    const interval = setInterval(() => {
      const ball = ballRef.current;
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y < 0 || ball.y > HEIGHT) ball.vy = -ball.vy;

      const player = playerRef.current;
      if (ball.x - BALL_SIZE < PADDLE_W && ball.y > player && ball.y < player + PADDLE_H) {
        ball.vx = Math.abs(ball.vx);
        ball.vy += (ball.y - (player + PADDLE_H / 2)) * 0.05;
      }

      const ai = aiRef.current;
      if (ball.x + BALL_SIZE > WIDTH - PADDLE_W && ball.y > ai && ball.y < ai + PADDLE_H) {
        ball.vx = -Math.abs(ball.vx);
        ball.vy += (ball.y - (ai + PADDLE_H / 2)) * 0.05;
      }

      if (ball.x < 0) {
        aiScoreRef.current++;
        if (aiScoreRef.current >= 5) { endGame(); return; }
        resetBall();
      }
      if (ball.x > WIDTH) {
        playerScoreRef.current++;
        setScore(playerScoreRef.current);
        resetBall();
      }

      const aiTarget = ball.y - PADDLE_H / 2;
      if (ai < aiTarget - 10) aiRef.current = Math.min(ai + AI_SPEED, HEIGHT - PADDLE_H);
      else if (ai > aiTarget + 10) aiRef.current = Math.max(ai - AI_SPEED, 0);
    }, 16);
    return () => clearInterval(interval);
  }, [gameRunning, endGame]);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameRunning) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    playerRef.current = Math.min(Math.max((e.clientY - rect.top) * (HEIGHT / rect.height) - PADDLE_H / 2, 0), HEIGHT - PADDLE_H);
  }, [gameRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = 'hsl(235 25% 10%)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#6366f1';
    ctx.fillRect(0, playerRef.current, PADDLE_W, PADDLE_H);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(WIDTH - PADDLE_W, aiRef.current, PADDLE_W, PADDLE_H);

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ballRef.current.x, ballRef.current.y, BALL_SIZE, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'hsl(var(--muted-foreground))';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${playerScoreRef.current}`, WIDTH / 2 - 30, 30);
    ctx.fillText(`${aiScoreRef.current}`, WIDTH / 2 + 30, 30);
  }, [ballRef.current.x, ballRef.current.y, playerRef.current, aiRef.current, playerScoreRef.current, aiScoreRef.current]);

  return (
    <MobileScreen title="Pong" onBack={onBack}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-between w-full max-w-[400px]">
          <div className="text-center"><div className="text-xs text-muted-foreground">Score</div><div className="text-lg font-bold">{score}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Best</div><div className="text-lg font-bold">{getHighScore('pong')}</div></div>
        </div>

        {highScoreReached && <div className="text-amber-400 font-bold text-sm animate-bounce">New High Score!</div>}
        {gameOver && <div className="text-red-500 font-bold">Game Over! You scored {score}</div>}

        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="rounded-xl border border-border/30" onMouseMove={handleMouse} />

        {!gameRunning && !gameOver && (
          <Button onClick={startGame} size="lg">Start Game</Button>
        )}
        {gameOver && <Button onClick={startGame} size="sm">Play Again</Button>}
        {gameRunning && (
          <Button onClick={() => setGameRunning(false)} variant="outline" size="sm">Pause</Button>
        )}
      </div>
    </MobileScreen>
  );
};
