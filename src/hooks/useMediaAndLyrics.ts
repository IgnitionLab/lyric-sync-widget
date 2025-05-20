
import { useState, useEffect, useRef } from 'react';
import { MediaSessionService, CurrentTrack } from '../services/MediaSessionService';
import { LyricsService, SongLyrics, LyricLine } from '../services/LyricsService';

interface UseMediaAndLyricsResult {
  currentTrack: CurrentTrack | null;
  currentLyrics: SongLyrics | null;
  currentLine: LyricLine | null;
  isLoading: boolean;
  error: string | null;
}

export function useMediaAndLyrics(provider: 'musixmatch' | 'genius' = 'musixmatch'): UseMediaAndLyricsResult {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [currentLyrics, setCurrentLyrics] = useState<SongLyrics | null>(null);
  const [currentLine, setCurrentLine] = useState<LyricLine | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const mediaService = useRef(MediaSessionService.getInstance());
  const lyricsService = useRef(LyricsService.getInstance());
  
  // Set the lyrics provider whenever it changes
  useEffect(() => {
    lyricsService.current.setProvider(provider);
  }, [provider]);
  
  // Start listening to media sessions when the component mounts
  useEffect(() => {
    const handleTrackChange = async (track: CurrentTrack) => {
      setCurrentTrack(track);
      setIsLoading(true);
      setError(null);
      
      try {
        const lyrics = await lyricsService.current.searchLyrics(track.artist, track.title);
        setCurrentLyrics(lyrics);
        setCurrentLine(lyrics?.lines[0] || null);
      } catch (err) {
        console.error('Failed to fetch lyrics:', err);
        setError('Failed to fetch lyrics');
        setCurrentLyrics(null);
        setCurrentLine(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    const handlePlaybackPositionChanged = (position: number) => {
      if (!currentLyrics?.lines) return;
      
      // Find the correct line based on the current position
      const positionMs = position * 1000;
      for (let i = currentLyrics.lines.length - 1; i >= 0; i--) {
        if (currentLyrics.lines[i].time <= positionMs) {
          setCurrentLine(currentLyrics.lines[i]);
          break;
        }
      }
    };
    
    const listener = {
      onTrackChanged: handleTrackChange,
      onPlaybackStateChanged: (state: 'playing' | 'paused' | 'stopped') => {
        // Update track's playback state
        if (currentTrack) {
          setCurrentTrack({ ...currentTrack, playbackState: state });
        }
      },
      onPlaybackPositionChanged: handlePlaybackPositionChanged
    };
    
    mediaService.current.addListener(listener);
    mediaService.current.startListening();
    
    return () => {
      mediaService.current.removeListener(listener);
      mediaService.current.stopListening();
    };
  }, [currentTrack, currentLyrics]);
  
  return {
    currentTrack,
    currentLyrics,
    currentLine,
    isLoading,
    error
  };
}
