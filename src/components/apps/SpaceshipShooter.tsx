import { IframeGame } from '@/components/IframeGame';

interface SpaceshipShooterProps {
  onBack: () => void;
}

export const SpaceshipShooter = ({ onBack }: SpaceshipShooterProps) => (
  <IframeGame onBack={onBack} title="Space Shooter" src="/games/spaceship-shooter.html" />
);
