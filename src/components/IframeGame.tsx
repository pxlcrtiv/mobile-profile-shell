import { MobileScreen } from '@/components/MobileScreen';

interface IframeGameProps {
  onBack: () => void;
  title: string;
  src: string;
}

export const IframeGame = ({ onBack, title, src }: IframeGameProps) => {
  return (
    <MobileScreen title={title} onBack={onBack}>
      <div className="-mx-6 -mb-6 h-full">
        <iframe
          src={src}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title={title}
        />
      </div>
    </MobileScreen>
  );
};
