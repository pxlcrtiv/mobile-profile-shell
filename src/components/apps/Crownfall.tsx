import { IframeGame } from '@/components/IframeGame';

interface CrownfallProps {
  onBack: () => void;
}

export const Crownfall = ({ onBack }: CrownfallProps) => (
  <IframeGame onBack={onBack} title="Crownfall" src="/games/crownfall.html" />
);
