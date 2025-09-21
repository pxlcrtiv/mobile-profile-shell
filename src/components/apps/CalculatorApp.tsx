import { useState } from 'react';
import { MobileScreen } from '@/components/MobileScreen';

interface CalculatorAppProps {
  onBack: () => void;
}

export const CalculatorApp = ({ onBack }: CalculatorAppProps) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ onClick, className, children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-full text-2xl font-medium transition-all duration-150 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <MobileScreen title="Calculator" onBack={onBack}>
      <div className="flex flex-col h-full">
        {/* Display */}
        <div className="flex-1 flex items-end justify-end p-6 bg-black/20 rounded-t-3xl">
          <div className="text-6xl font-light text-white text-right leading-none">
            {display.length > 8 ? parseFloat(display).toExponential(3) : display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3 p-6 bg-black/10 rounded-b-3xl">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="bg-muted/50 text-foreground hover:bg-muted/70"
          >
            AC
          </Button>
          <Button
            onClick={() => setDisplay(String(-parseFloat(display)))}
            className="bg-muted/50 text-foreground hover:bg-muted/70"
          >
            ±
          </Button>
          <Button
            onClick={() => setDisplay(String(parseFloat(display) / 100))}
            className="bg-muted/50 text-foreground hover:bg-muted/70"
          >
            %
          </Button>
          <Button
            onClick={() => performOperation('÷')}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputDigit('7')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            7
          </Button>
          <Button
            onClick={() => inputDigit('8')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            8
          </Button>
          <Button
            onClick={() => inputDigit('9')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation('×')}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputDigit('4')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            4
          </Button>
          <Button
            onClick={() => inputDigit('5')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            5
          </Button>
          <Button
            onClick={() => inputDigit('6')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation('-')}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            −
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputDigit('1')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            1
          </Button>
          <Button
            onClick={() => inputDigit('2')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            2
          </Button>
          <Button
            onClick={() => inputDigit('3')}
            className="bg-muted text-white hover:bg-muted/80"
          >
            3
          </Button>
          <Button
            onClick={() => performOperation('+')}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputDigit('0')}
            className="col-span-2 bg-muted text-white hover:bg-muted/80"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-muted text-white hover:bg-muted/80"
          >
            .
          </Button>
          <Button
            onClick={handleEquals}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            =
          </Button>
        </div>
      </div>
    </MobileScreen>
  );
};