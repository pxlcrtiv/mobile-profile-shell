import { useState, useRef, useEffect } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scan, Image as ImageIcon, Share2, Download, Copy, X, CheckCircle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface QRCodeAppProps {
  onBack: () => void;
}

// Mock scan history data
const mockScanHistory = [
  { id: 1, content: 'https://example.com', type: 'url', date: 'Today, 12:45 PM' },
  { id: 2, content: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', type: 'wifi', date: 'Yesterday, 3:20 PM' },
  { id: 3, content: 'contact:John Doe;email:john@example.com;phone:+1234567890;', type: 'contact', date: '2 days ago, 9:15 AM' },
  { id: 4, content: 'https://github.com/username/repo', type: 'url', date: '3 days ago, 5:30 PM' },
];

export const QRCodeApp = ({ onBack }: QRCodeAppProps) => {
  const [activeTab, setActiveTab] = useState('generator');
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [showFlash, setShowFlash] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [scanHistory, setScanHistory] = useState(mockScanHistory);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('url');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate QR code generation
  const generateQRCode = () => {
    if (!inputText.trim()) {
      setError('Please enter text or URL to generate QR code');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, we would use a QR code generation library here
      // This is just a placeholder image
      setGeneratedImageUrl(`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjgwIiBmaWxsPSIjMzMzIi8+PHBhdGggZD0iTTYwIDYwIEwxNDAgMTQwIE0xNDAgNjAgTDYwIDE0MCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjM2MzIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjYwIiByPSI0MCIgZmlsbD0iIzNjMyIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iIzNjMyIvPjxjaXJjbGUgY3g9IjE0MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiMzYzMiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxNDAiIHI9IjQwIiBmaWxsPSIjM2MzIi8+PC9zdmc+`);
      setIsGenerating(false);
    }, 800);
  };

  // Simulate QR code scanning
  const startScan = () => {
    setIsScanning(true);
    setScanResult('');
    setError('');

    // Simulate scanning process
    setTimeout(() => {
      // In a real app, we would access the camera and process video frames
      // For demo, we'll randomly select a previous scan result
      const randomResult = mockScanHistory[Math.floor(Math.random() * mockScanHistory.length)];
      setScanResult(randomResult.content);
      
      // Add to scan history
      setScanHistory(prev => [
        { ...randomResult, id: Date.now(), date: 'Just now' },
        ...prev.slice(0, 4)
      ]);
      
      setIsScanning(false);
    }, 2000);
  };

  const stopScan = () => {
    setIsScanning(false);
    setScanResult('');
  };

  const copyToClipboard = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // Clear generated image when input changes
    if (generatedImageUrl) {
      setGeneratedImageUrl('');
    }
    if (error) {
      setError('');
    }
  };

  const openUrl = (url: string) => {
    // Simple URL validation
    if (!url.startsWith('http')) {
      url = `http://${url}`;
    }
    window.open(url, '_blank');
  };

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'QR Code Result',
        text: scanResult || inputText,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard();
    }
  };

  const clearInput = () => {
    setInputText('');
    setGeneratedImageUrl('');
    setError('');
  };

  return (
    <MobileScreen title="QR Code Utility" onBack={onBack}>
      <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="scanner">Scanner</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generator" className="space-y-4 p-4 m-0">
          <div className="space-y-2">
            <Label htmlFor="qr-content">Enter text or URL</Label>
            <div className="relative">
              <Input
                id="qr-content"
                placeholder="https://example.com or any text"
                value={inputText}
                onChange={handleInputChange}
                className={`pr-8 ${error ? 'border-destructive' : ''}`}
              />
              {inputText && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={clearInput}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {error && (
              <p className="text-sm text-destructive mt-1">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="qr-type">Content Type</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={selectedType === 'url' ? 'default' : 'outline'}
                className="justify-center"
                onClick={() => setSelectedType('url')}
              >
                URL
              </Button>
              <Button
                variant={selectedType === 'text' ? 'default' : 'outline'}
                className="justify-center"
                onClick={() => setSelectedType('text')}
              >
                Text
              </Button>
              <Button
                variant={selectedType === 'wifi' ? 'default' : 'outline'}
                className="justify-center"
                onClick={() => setSelectedType('wifi')}
              >
                WiFi
              </Button>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={generateQRCode}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate QR Code'}
          </Button>

          {/* QR Code Preview */}
          {generatedImageUrl && (
            <Card className="overflow-hidden">
              <div className="p-6 flex flex-col items-center justify-center bg-background">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  {isGenerating ? (
                    <Skeleton className="w-64 h-64 rounded-md" />
                  ) : (
                    <img
                      src={generatedImageUrl}
                      alt="QR Code"
                      className="w-64 h-64 object-contain"
                    />
                  )}
                </div>
                <p className="text-center mt-4 text-sm text-muted-foreground">
                  {inputText || 'Scan this QR code'}
                </p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-border">
                <Button
                  variant="ghost"
                  className="justify-center rounded-none"
                  onClick={shareContent}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  className="justify-center rounded-none"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </Card>
          )}

          {/* Tips section */}
          <Card className="p-4">
            <h3 className="font-medium mb-2 text-sm">QR Code Tips</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start">
                <ChevronRight className="h-3 w-3 mr-1 mt-0.5 text-primary shrink-0" />
                <span>Use high contrast colors for better scannability</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-3 w-3 mr-1 mt-0.5 text-primary shrink-0" />
                <span>Keep URLs short for more reliable scanning</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-3 w-3 mr-1 mt-0.5 text-primary shrink-0" />
                <span>Add a logo to make your QR code more recognizable</span>
              </li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="scanner" className="space-y-4 p-4 m-0">
          <Card className="relative overflow-hidden">
            <div className="aspect-[4/3] bg-black flex items-center justify-center">
              {isScanning ? (
                <div className="text-center text-white">
                  <Scan className="h-16 w-16 mx-auto mb-4 text-white/70 animate-pulse" />
                  <p className="text-white/80">Scanning for QR codes...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Scan className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Camera view will appear here</p>
                </div>
              )}
              {/* Camera view would go here in a real implementation */}
              <canvas ref={canvasRef} className="hidden absolute inset-0 w-full h-full" />
              <video ref={videoRef} className="hidden absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <Button
                variant="ghost"
                className="justify-center rounded-none"
                onClick={isScanning ? stopScan : startScan}
              >
                {isScanning ? 'Stop Scan' : 'Start Scan'}
              </Button>
              <div className="flex items-center justify-center p-3 space-x-2">
                <Switch
                  id="flash"
                  checked={showFlash}
                  onCheckedChange={setShowFlash}
                />
                <Label htmlFor="flash" className="text-sm cursor-pointer">
                  Flash
                </Label>
              </div>
            </div>
          </Card>

          {scanResult && (
            <Card className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Scan Result</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg break-all text-sm">
                {scanResult}
              </div>
              {scanResult.includes('http') && (
                <Button
                  className="w-full"
                  onClick={() => openUrl(scanResult)}
                >
                  Open Link
                </Button>
              )}
              {scanResult.includes('WIFI:') && (
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Connect to WiFi
                </Button>
              )}
              {scanResult.includes('contact:') && (
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Add to Contacts
                </Button>
              )}
            </Card>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <p>Tip: For best results, keep the QR code within the frame and well-lit</p>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 p-4 m-0">
          {scanHistory.length > 0 ? (
            <div className="space-y-3">
              {scanHistory.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm break-all max-w-[80%]">
                        {item.content.length > 50 ? `${item.content.substring(0, 50)}...` : item.content}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/50">
                        {item.type.toUpperCase()}
                      </span>
                      {item.content.includes('http') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs px-2"
                          onClick={() => openUrl(item.content)}
                        >
                          Open
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-auto"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-4">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center">
                <Scan className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-medium">No Scan History</h3>
              <p className="text-sm">Start scanning QR codes to build your history</p>
            </div>
          )}

          {scanHistory.length > 0 && (
            <Button
              variant="destructive"
              className="w-full"
            >
              Clear History
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </MobileScreen>
  );
};