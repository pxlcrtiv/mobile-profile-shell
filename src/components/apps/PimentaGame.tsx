import { IframeGame } from '@/components/IframeGame';

interface PimentaGameProps {
  onBack: () => void;
}

export const PimentaGame = ({ onBack }: PimentaGameProps) => (
  <IframeGame onBack={onBack} title="Pimenta" src="/games/pimenta.html" />
);
