
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LyricsPreviewProps {
  darkMode: boolean;
}

const LyricsPreview: React.FC<LyricsPreviewProps> = ({ darkMode }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const sampleLyrics = [
    "♪ I've been reading books of old",
    "♪ The legends and the myths",
    "♪ Achilles and his gold",
    "♪ Hercules and his gifts",
    "♪ Spiderman's control",
    "♪ And Batman with his fists"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % sampleLyrics.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={cn(
      "p-6 relative overflow-hidden transition-all duration-300 min-h-[180px] flex items-center justify-center",
      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800 shadow-lg"
    )}>
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
        <div className="text-xs opacity-70">Now Playing</div>
        <div className="text-xs opacity-70">1:42 / 3:24</div>
      </div>
      
      <div className="w-full">
        <div className="text-sm mb-2 opacity-70 text-center">
          {darkMode ? "⚪ Coldplay" : "⚫ Coldplay"}
        </div>
        <div className="text-lg font-medium mb-4 text-center">Something Just Like This</div>
        
        <div className="relative h-[60px] overflow-hidden">
          {sampleLyrics.map((line, index) => (
            <div
              key={index}
              className={cn(
                "absolute w-full text-center transition-all duration-500",
                index === currentLine
                  ? "opacity-100 translate-y-0"
                  : index === (currentLine - 1 + sampleLyrics.length) % sampleLyrics.length
                  ? "opacity-40 -translate-y-full"
                  : index === (currentLine + 1) % sampleLyrics.length
                  ? "opacity-40 translate-y-full"
                  : "opacity-0"
              )}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500 opacity-70" style={{ width: '45%' }}></div>
    </Card>
  );
};

export default LyricsPreview;
