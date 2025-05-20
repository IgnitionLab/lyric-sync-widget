
import React from 'react';
import { useMediaAndLyrics } from '../hooks/useMediaAndLyrics';
import { cn } from '@/lib/utils';

interface LyricsWidgetProps {
  provider: 'musixmatch' | 'genius';
  darkMode: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LyricsWidget: React.FC<LyricsWidgetProps> = ({ 
  provider = 'musixmatch',
  darkMode = false,
  size = 'medium' 
}) => {
  const { currentTrack, currentLyrics, currentLine, isLoading, error } = useMediaAndLyrics(provider);
  
  if (isLoading) {
    return (
      <div className={cn(
        "flex items-center justify-center p-4",
        size === 'small' ? 'h-24' : size === 'medium' ? 'h-40' : 'h-64',
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      )}>
        <div className="text-center animate-pulse">
          <div className="text-sm">Loading lyrics...</div>
        </div>
      </div>
    );
  }
  
  if (error || !currentTrack) {
    return (
      <div className={cn(
        "flex items-center justify-center p-4",
        size === 'small' ? 'h-24' : size === 'medium' ? 'h-40' : 'h-64',
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      )}>
        <div className="text-center">
          <div className="text-sm">{error || "No music playing"}</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "relative overflow-hidden transition-all duration-300",
      size === 'small' ? 'p-3' : size === 'medium' ? 'p-4' : 'p-6',
      darkMode 
        ? 'bg-gray-800 text-white bg-opacity-90' 
        : 'bg-white text-gray-800 bg-opacity-90 shadow-lg',
    )}>
      {/* Progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-violet-500" 
        style={{ 
          width: `${(currentTrack.position / currentTrack.duration) * 100}%` 
        }}
      />
      
      {/* Track info */}
      <div 
        className={cn(
          "flex justify-between items-center",
          size === 'small' ? 'mb-1' : 'mb-2'
        )}
      >
        <div className={size === 'small' ? 'text-xs' : 'text-sm'}>
          {currentTrack.title}
        </div>
        <div className="text-xs opacity-70">
          {formatTime(currentTrack.position)} / {formatTime(currentTrack.duration)}
        </div>
      </div>
      
      <div className="text-xs opacity-70 mb-2">
        {currentTrack.artist}
        {currentTrack.album ? ` • ${currentTrack.album}` : ''}
      </div>
      
      {/* Lyrics */}
      <div className={cn(
        "w-full",
        size === 'small' ? 'h-8' : size === 'medium' ? 'h-16' : 'h-32'
      )}>
        {currentLyrics && currentLine ? (
          <div className="animate-lyrics-slide-up text-center font-medium">
            {currentLine.text}
          </div>
        ) : (
          <div className="text-center opacity-70 text-sm">
            No lyrics available
          </div>
        )}
      </div>
      
      {/* Provider attribution */}
      {currentLyrics?.provider && (
        <div className="absolute bottom-1 right-2 text-xs opacity-40">
          via {currentLyrics.provider}
        </div>
      )}
    </div>
  );
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default LyricsWidget;
