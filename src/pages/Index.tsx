
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LyricsPreview from '@/components/LyricsPreview';
import PermissionsGuide from '@/components/PermissionsGuide';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [lockScreenEnabled, setLockScreenEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [apiSelection, setApiSelection] = useState('musixmatch');
  const { toast } = useToast();
  
  const handleWidgetSetup = () => {
    toast({
      title: "Widget Setup",
      description: "Please follow the instructions to add the widget to your home screen",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center pt-6 pb-4">
          <h1 className="text-3xl font-bold text-violet-900 dark:text-violet-300">Lyric Widget</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Real-time lyrics for your music
          </p>
        </div>
        
        <LyricsPreview darkMode={darkMode} />

        <Card className="p-6">
          <Tabs defaultValue="settings" className="space-y-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="lock-screen" className="flex flex-col">
                  <span>Lock Screen Lyrics</span>
                  <span className="text-sm text-muted-foreground">Show lyrics on lock screen</span>
                </Label>
                <Switch 
                  id="lock-screen" 
                  checked={lockScreenEnabled}
                  onCheckedChange={setLockScreenEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex flex-col">
                  <span>Dark Mode</span>
                  <span className="text-sm text-muted-foreground">Use dark theme for widget</span>
                </Label>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Lyrics Provider</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={apiSelection === 'musixmatch' ? 'default' : 'outline'}
                    onClick={() => setApiSelection('musixmatch')}
                    className="justify-start"
                  >
                    Musixmatch
                  </Button>
                  <Button 
                    variant={apiSelection === 'genius' ? 'default' : 'outline'}
                    onClick={() => setApiSelection('genius')}
                    className="justify-start"
                  >
                    Genius
                  </Button>
                </div>
              </div>
              
              <Button className="w-full mt-4" onClick={handleWidgetSetup}>
                Set Up Widget
              </Button>
            </TabsContent>
            
            <TabsContent value="permissions">
              <PermissionsGuide />
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4">
          <p>Android 10+ supported • Battery optimized</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
