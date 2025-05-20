
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PermissionsGuide = () => {
  const { toast } = useToast();

  const requestPermission = (permissionName: string) => {
    toast({
      title: "Permission Request",
      description: `Please grant ${permissionName} permission in the next dialog`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        The following permissions are needed for the widget to function properly:
      </div>
      
      <div className="space-y-3">
        <PermissionItem 
          name="Notification Listener" 
          description="To detect currently playing songs"
          granted={false}
          onRequest={() => requestPermission("Notification Listener")}
        />
        
        <PermissionItem 
          name="Display Over Other Apps" 
          description="Required for lock screen display"
          granted={false}
          onRequest={() => requestPermission("Display Over Other Apps")}
        />
        
        <PermissionItem 
          name="Internet" 
          description="To fetch lyrics from providers"
          granted={true}
          onRequest={() => {}}
        />
      </div>
      
      <div className="border-t pt-3 mt-3">
        <div className="text-sm flex items-center">
          <AlertCircle size={16} className="mr-2 text-amber-500" />
          <span>Grant all permissions for full functionality</span>
        </div>
      </div>
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
