
export interface LyricLine {
  text: string;
  time: number; // Time in milliseconds
}

export interface SongLyrics {
  lines: LyricLine[];
  provider: string;
  copyright?: string;
}

export class LyricsService {
  private static instance: LyricsService;
  private currentProvider: 'musixmatch' | 'genius' = 'musixmatch';
  
  private constructor() {
    console.log("LyricsService initialized");
  }
  
  public static getInstance(): LyricsService {
    if (!LyricsService.instance) {
      LyricsService.instance = new LyricsService();
    }
    return LyricsService.instance;
  }
  
  public setProvider(provider: 'musixmatch' | 'genius'): void {
    this.currentProvider = provider;
    console.log(`Lyrics provider set to: ${provider}`);
  }
  
  public async searchLyrics(artist: string, title: string): Promise<SongLyrics | null> {
    console.log(`Searching lyrics for: ${artist} - ${title}`);
    
    // In a real implementation, we'd make an API call to the selected provider
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getMockLyrics());
      }, 500);
    });
  }
  
  private getMockLyrics(): SongLyrics {
    if (this.currentProvider === 'musixmatch') {
      return {
        provider: 'musixmatch',
        copyright: '© Musixmatch',
        lines: [
          { text: "I've been reading books of old", time: 15000 },
          { text: "The legends and the myths", time: 18000 },
          { text: "Achilles and his gold", time: 21000 },
          { text: "Hercules and his gifts", time: 24000 },
          { text: "Spiderman's control", time: 27000 },
          { text: "And Batman with his fists", time: 30000 },
          { text: "And clearly I don't see myself upon that list", time: 33000 },
          { text: "But she said, where'd you wanna go?", time: 38000 },
          { text: "How much you wanna risk?", time: 41000 },
          { text: "I'm not looking for somebody", time: 44000 },
          { text: "With some superhuman gifts", time: 47000 },
          { text: "Some superhero", time: 50000 },
          { text: "Some fairytale bliss", time: 53000 },
          { text: "Just something I can turn to", time: 56000 },
          { text: "Somebody I can kiss", time: 59000 },
        ]
      };
    } else {
      // Genius format might be slightly different
      return {
        provider: 'genius',
        copyright: '© Genius Media Group Inc.',
        lines: [
          { text: "[Verse 1: Chris Martin]", time: 12000 },
          { text: "I've been reading books of old", time: 15000 },
          { text: "The legends and the myths", time: 18000 },
          { text: "Achilles and his gold", time: 21000 },
          { text: "Hercules and his gifts", time: 24000 },
          { text: "Spiderman's control", time: 27000 },
          { text: "And Batman with his fists", time: 30000 },
          { text: "And clearly I don't see myself upon that list", time: 33000 },
        ]
      };
    }
  }
}
