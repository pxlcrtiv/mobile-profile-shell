import { useLocalStorage } from './useLocalStorage';

type HighScores = Record<string, number[]>;

export function useHighScores() {
  const [scores, setScores] = useLocalStorage<HighScores>('game-high-scores', {});

  const addScore = (gameId: string, score: number) => {
    setScores(prev => {
      const gameScores = [...(prev[gameId] || [])];
      gameScores.push(score);
      gameScores.sort((a, b) => b - a);
      return { ...prev, [gameId]: gameScores.slice(0, 10) };
    });
  };

  const getHighScore = (gameId: string): number => {
    return (scores[gameId] || [])[0] || 0;
  };

  const getTopScores = (gameId: string): number[] => {
    return scores[gameId] || [];
  };

  const isNewHighScore = (gameId: string, score: number): boolean => {
    return score > getHighScore(gameId);
  };

  return { addScore, getHighScore, getTopScores, isNewHighScore };
}
