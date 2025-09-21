import { useState } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';

interface TicTacToeAppProps {
  onBack: () => void;
}

type Player = 'X' | 'O' | null;

export const TicTacToeApp = ({ onBack }: TicTacToeAppProps) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'tie'>(null);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  const checkWinner = (squares: Player[]): Player | 'tie' => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'tie';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prev => ({
        ...prev,
        [gameWinner === 'tie' ? 'ties' : gameWinner]: prev[gameWinner === 'tie' ? 'ties' : gameWinner] + 1
      }));
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
    resetGame();
  };

  const Square = ({ value, onClick, index }: { value: Player; onClick: () => void; index: number }) => (
    <button
      onClick={onClick}
      className="aspect-square bg-secondary/30 backdrop-blur-sm border border-border/20 rounded-2xl flex items-center justify-center text-4xl font-bold transition-all duration-200 hover:bg-secondary/50 active:scale-95"
    >
      <span className={value === 'X' ? 'text-blue-400' : value === 'O' ? 'text-red-400' : ''}>
        {value}
      </span>
    </button>
  );

  return (
    <MobileScreen title="Tic Tac Toe" onBack={onBack}>
      <div className="flex flex-col h-full space-y-6">
        {/* Scores */}
        <div className="flex justify-around bg-secondary/20 rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{scores.X}</div>
            <div className="text-sm text-muted-foreground">X Wins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{scores.ties}</div>
            <div className="text-sm text-muted-foreground">Ties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{scores.O}</div>
            <div className="text-sm text-muted-foreground">O Wins</div>
          </div>
        </div>

        {/* Game Status */}
        <div className="text-center">
          {winner ? (
            <div className="text-xl font-bold">
              {winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`}
            </div>
          ) : (
            <div className="text-lg">
              Current player: <span className={`font-bold ${currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}`}>
                {currentPlayer}
              </span>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
            {board.map((square, index) => (
              <Square
                key={index}
                value={square}
                onClick={() => handleClick(index)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button onClick={resetGame} variant="outline" size="lg">
            New Game
          </Button>
          <Button onClick={resetScores} variant="outline" size="lg">
            Reset Scores
          </Button>
        </div>
      </div>
    </MobileScreen>
  );
};