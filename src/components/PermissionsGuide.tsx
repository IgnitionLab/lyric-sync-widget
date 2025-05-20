
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const PermissionsGuide = () => {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState({
    notificationListener: false,
    displayOverOtherApps: false,
    internet: true // Internet permission is usually granted by default
  });

  // This would be replaced with actual permission checking code in a real Android app
  // Here we're just simulating the permission check
  useEffect(() => {
    // In a real app, you would check the actual permission statuses here
    // and update the state accordingly
    const checkPermissions = async () => {
      // Simulating permission checks - in a real app you'd use native APIs
      // through Capacitor plugins to check actual permission status
      console.log("Checking permissions...");
      
      // This is where you'd implement actual permission checks
    };
    
    checkPermissions();
  }, []);

  const requestPermission = (permissionName: string, permissionKey: keyof typeof permissions) => {
    toast({
      title: "Permission Request",
      description: `Please grant ${permissionName} permission in the next dialog`,
    });
    
    // In a real app, this would trigger the actual permission request
    // For our demo, we'll simulate granting the permission after a delay
    setTimeout(() => {
      setPermissions(prev => ({
        ...prev,
        [permissionKey]: true
      }));
      
      toast({
        title: "Permission Granted",
        description: `${permissionName} permission has been granted.`,
      });
    }, 1500);
  };

  const areAllPermissionsGranted = Object.values(permissions).every(Boolean);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        The following permissions are needed for the widget to function properly:
      </div>
      
      <div className="space-y-3">
        <PermissionItem 
          name="Notification Listener" 
          description="To detect currently playing songs"
          granted={permissions.notificationListener}
          onRequest={() => requestPermission("Notification Listener", "notificationListener")}
        />
        
        <PermissionItem 
          name="Display Over Other Apps" 
          description="Required for lock screen display"
          granted={permissions.displayOverOtherApps}
          onRequest={() => requestPermission("Display Over Other Apps", "displayOverOtherApps")}
        />
        
        <PermissionItem 
          name="Internet" 
          description="To fetch lyrics from providers"
          granted={permissions.internet}
          onRequest={() => {}}
        />
      </div>
      
      <div className="border-t pt-3 mt-3">
        <div className="text-sm flex items-center">
          {areAllPermissionsGranted ? (
            <>
              <Check size={16} className="mr-2 text-green-500" />
              <span>All permissions granted! The widget is ready to use.</span>
            </>
          ) : (
            <>
              <AlertCircle size={16} className="mr-2 text-amber-500" />
              <span>Grant all permissions for full functionality</span>
            </>
          )}
        </div>
      </div>

      {areAllPermissionsGranted && (
        <div className="mt-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="link" className="text-sm flex items-center p-0 h-auto">
                <ExternalLink size={14} className="mr-1" />
                Learn how to set up the widget
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90%] sm:max-w-md">
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Setting Up Your Widget</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Long press on your home screen</li>
                  <li>Select "Widgets" from the menu</li>
                  <li>Find "Lyric Widget" in the list</li>
                  <li>Drag and drop it to your home screen</li>
                  <li>Resize as needed by long pressing the widget</li>
                </ol>
                <p className="text-sm text-muted-foreground mt-4">
                  The widget will automatically display lyrics when music is playing on your device.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
};

interface PermissionItemProps {
  name: string;
  description: string;
  granted: boolean;
  onRequest: () => void;
}

const PermissionItem = ({ name, description, granted, onRequest }: PermissionItemProps) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
    {granted ? (
      <div className="flex items-center text-green-600">
        <Check size={18} className="mr-1" />
        <span className="text-sm">Granted</span>
      </div>
    ) : (
      <Button variant="outline" size="sm" onClick={onRequest}>
        Grant
      </Button>
    )}
  </div>
);

export default PermissionsGuide;
