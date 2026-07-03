import { useState, useEffect } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';
import { useHighScores } from '@/hooks/useHighScores';

interface MemoryMatchProps {
  onBack: () => void;
}

const EMOJIS = ['🐶', '🐱', '🐸', '🦊', '🐻', '🐼', '🐨', '🦁', '🐮', '🐷', '🐵', '🐰', '🦄', '🐲', '🐙', '🦋'];

export const MemoryMatch = ({ onBack }: MemoryMatchProps) => {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gridSize, setGridSize] = useState(4);
  const { addScore, getHighScore, isNewHighScore } = useHighScores();
  const [highScoreReached, setHighScoreReached] = useState(false);

  const initGame = (size: number) => {
    const pairCount = (size * size) / 2;
    const selectedEmojis = EMOJIS.slice(0, pairCount);
    const deck = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
    setCards(deck);
    setFlipped([]);
    setMoves(0);
    setMatched(0);
    setGameWon(false);
    setHighScoreReached(false);
    setGameStarted(true);
  };

  useEffect(() => { initGame(gridSize); }, [gridSize]);

  const handleCardClick = (id: number) => {
    if (flipped.length === 2 || cards[id].flipped || cards[id].matched) return;
    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    setFlipped(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flipped.length !== 2) return;
    setMoves(m => m + 1);
    const [first, second] = flipped;
    if (cards[first].emoji === cards[second].emoji) {
      const newCards = [...cards];
      newCards[first].matched = true;
      newCards[second].matched = true;
      setCards(newCards);
      setMatched(m => {
        const newMatched = m + 2;
        if (newMatched === cards.length) {
          setGameWon(true);
          const score = Math.max(100, 1000 - moves * 10 + gridSize * 50);
          addScore('memory', score);
          if (isNewHighScore('memory', score)) setHighScoreReached(true);
        }
        return newMatched;
      });
      setFlipped([]);
    } else {
      const timeout = setTimeout(() => {
        const newCards = [...cards];
        newCards[first].flipped = false;
        newCards[second].flipped = false;
        setCards(newCards);
        setFlipped([]);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [flipped]);

  return (
    <MobileScreen title="Memory Match" onBack={onBack}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-between w-full max-w-xs">
          <div className="text-center"><div className="text-xs text-muted-foreground">Moves</div><div className="text-lg font-bold">{moves}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Best</div><div className="text-lg font-bold">{getHighScore('memory')}</div></div>
        </div>

        <div className="flex gap-2">
          {[4, 6].map(size => (
            <Button key={size} onClick={() => setGridSize(size)} variant={gridSize === size ? 'default' : 'outline'} size="sm">
              {size}x{size}
            </Button>
          ))}
        </div>

        {highScoreReached && <div className="text-amber-400 font-bold text-sm animate-bounce">New High Score!</div>}
        {gameWon && <div className="text-green-400 font-bold">You Win! Score: {Math.max(100, 1000 - moves * 10 + gridSize * 50)}</div>}

        <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '6px' }}>
          {cards.map(card => (
            <button key={card.id} onClick={() => handleCardClick(card.id)}
              className={`w-14 h-14 rounded-xl text-2xl flex items-center justify-center transition-all duration-300 ${
                card.flipped || card.matched
                  ? 'bg-secondary/50 scale-100'
                  : 'bg-gradient-to-br from-indigo-500 to-violet-600 hover:scale-105 active:scale-95'
              } ${card.matched ? 'opacity-60' : ''}`}>
              {(card.flipped || card.matched) ? card.emoji : '?'}
            </button>
          ))}
        </div>

        <Button onClick={() => initGame(gridSize)} variant="outline" size="sm">Restart</Button>
      </div>
    </MobileScreen>
  );
};
