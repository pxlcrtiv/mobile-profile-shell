import { useState, useEffect, useCallback } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';

interface SnakeGameAppProps {
  onBack: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export const SnakeGameApp = ({ onBack }: SnakeGameAppProps) => {
  const GRID_SIZE = 15;
  const INITIAL_SNAKE = [{ x: 7, y: 7 }];
  const INITIAL_FOOD = { x: 5, y: 5 };

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameRunning(false);
  };

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameOver, generateFood]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const handleDirectionChange = (newDirection: Direction) => {
    // Prevent reverse direction
    if (
      (direction === 'UP' && newDirection === 'DOWN') ||
      (direction === 'DOWN' && newDirection === 'UP') ||
      (direction === 'LEFT' && newDirection === 'RIGHT') ||
      (direction === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    setDirection(newDirection);
  };

  const DirectionButton = ({ dir, label, className }: { dir: Direction; label: string; className?: string }) => (
    <Button
      onClick={() => handleDirectionChange(dir)}
      className={`h-12 w-12 ${className}`}
      disabled={!gameRunning}
    >
      {label}
    </Button>
  );

  return (
    <MobileScreen title="Snake" onBack={onBack}>
      <div className="flex flex-col h-full">
        {/* Score */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          {gameOver && <div className="text-red-500 font-bold">Game Over!</div>}
        </div>

        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center mb-4">
          <div 
            className="grid gap-1 bg-secondary/20 p-2 rounded-xl"
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              aspectRatio: '1'
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-sm ${
                    isFood 
                      ? 'bg-red-500' 
                      : isHead 
                      ? 'bg-green-400' 
                      : isSnake 
                      ? 'bg-green-600' 
                      : 'bg-muted/30'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Direction Controls */}
          <div className="flex flex-col items-center space-y-2">
            <DirectionButton dir="UP" label="↑" />
            <div className="flex space-x-4">
              <DirectionButton dir="LEFT" label="←" />
              <DirectionButton dir="DOWN" label="↓" />
              <DirectionButton dir="RIGHT" label="→" />
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex justify-center space-x-4">
            {!gameRunning && !gameOver && (
              <Button onClick={() => setGameRunning(true)} size="lg">
                Start Game
              </Button>
            )}
            {gameRunning && (
              <Button onClick={() => setGameRunning(false)} variant="outline" size="lg">
                Pause
              </Button>
            )}
            <Button onClick={resetGame} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
};