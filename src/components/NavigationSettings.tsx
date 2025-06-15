
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Layout } from "lucide-react";

interface NavigationSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavigationSettings = ({ 
  open, 
  onOpenChange
}: NavigationSettingsProps) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Navigation Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Mega Menu Sidebar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• The sidebar uses a mega menu style with organized groups and collapsible sections</p>
                <p>• Use the toggle button in the sidebar header to collapse/expand the menu</p>
                <p>• When collapsed, only active section icons are shown for quick reference</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
