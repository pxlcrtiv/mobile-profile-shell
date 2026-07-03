import { IframeGame } from '@/components/IframeGame';

interface SlidingPuzzleProps {
  onBack: () => void;
}

export const SlidingPuzzle = ({ onBack }: SlidingPuzzleProps) => (
  <IframeGame onBack={onBack} title="Sliding Puzzle" src="/games/sliding-puzzle/index.html" />
);
