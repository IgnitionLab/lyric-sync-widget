
// This is a placeholder service that will be replaced with actual native Android code
// The interface is designed to match what we'd implement in native Android

export interface CurrentTrack {
  title: string;
  artist: string;
  album?: string;
  duration: number;
  position: number;
  playbackState: 'playing' | 'paused' | 'stopped';
  artworkUri?: string;
}

export interface MediaSessionListener {
  onTrackChanged: (track: CurrentTrack) => void;
  onPlaybackStateChanged: (state: 'playing' | 'paused' | 'stopped') => void;
  onPlaybackPositionChanged: (position: number) => void;
}

export class MediaSessionService {
  private static instance: MediaSessionService;
  private listeners: MediaSessionListener[] = [];
  
  // This is a mock implementation for web preview
  private mockData: CurrentTrack = {
    title: "Something Just Like This",
    artist: "Coldplay",
    album: "Memories...Do Not Open",
    duration: 247, // in seconds
    position: 0,
    playbackState: 'playing',
    artworkUri: "https://example.com/artwork.jpg"
  };
  
  private mockInterval: number | null = null;
  
  private constructor() {
    console.log("MediaSessionService initialized");
  }
  
  public static getInstance(): MediaSessionService {
    if (!MediaSessionService.instance) {
      MediaSessionService.instance = new MediaSessionService();
    }
    return MediaSessionService.instance;
  }
  
  public startListening(): void {
    console.log("Starting to listen to media sessions");
    
    // In a real implementation, we would initialize the native code here
    // For the mock, we'll just start a timer to simulate position updates
    
    this.mockInterval = window.setInterval(() => {
      this.mockData.position += 1;
      if (this.mockData.position > this.mockData.duration) {
        this.mockData.position = 0;
      }
      
      this.listeners.forEach(listener => {
        listener.onPlaybackPositionChanged(this.mockData.position);
      });
    }, 1000) as unknown as number;
  }
  
  public stopListening(): void {
    console.log("Stopping media session listening");
    if (this.mockInterval !== null) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }
  
  public addListener(listener: MediaSessionListener): void {
    this.listeners.push(listener);
    
    // Immediately notify with current data
    listener.onTrackChanged(this.mockData);
    listener.onPlaybackStateChanged(this.mockData.playbackState);
    listener.onPlaybackPositionChanged(this.mockData.position);
  }
  
  public removeListener(listener: MediaSessionListener): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
  
  // In native Android implementation, these methods would be called by the native code
  // to notify our JavaScript code about media session events
  public notifyTrackChanged(track: CurrentTrack): void {
    this.listeners.forEach(listener => {
      listener.onTrackChanged(track);
    });
  }
  
  public notifyPlaybackStateChanged(state: 'playing' | 'paused' | 'stopped'): void {
    this.listeners.forEach(listener => {
      listener.onPlaybackStateChanged(state);
    });
  }
}
