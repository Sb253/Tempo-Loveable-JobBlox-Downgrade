
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationToggle } from "./NavigationToggle";
import { Settings, Layout, Menu, Sidebar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavigationSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLayout: 'sidebar' | 'menu';
  onLayoutChange: (layout: 'sidebar' | 'menu') => void;
}

export const NavigationSettings = ({ 
  open, 
  onOpenChange, 
  currentLayout, 
  onLayoutChange 
}: NavigationSettingsProps) => {
  const { toast } = useToast();

  const handleSidebarStyleChange = (style: 'standard' | 'mega-menu') => {
    localStorage.setItem('sidebarLayout', style);
    toast({
      title: "Sidebar Updated",
      description: `Switched to ${style === 'mega-menu' ? 'mega menu' : 'standard'} sidebar`,
    });
    // Trigger a page reload to apply the new sidebar style
    window.location.reload();
  };

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
                Layout Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Choose Navigation Style</Label>
                <NavigationToggle 
                  currentLayout={currentLayout}
                  onLayoutChange={onLayoutChange}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>• <strong>Menu:</strong> Horizontal navigation with dropdown menus</p>
                <p>• <strong>Sidebar:</strong> Vertical navigation panel</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sidebar className="h-4 w-4" />
                Sidebar Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Sidebar Layout</Label>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSidebarStyleChange('standard')}
                    className="flex items-center gap-2"
                  >
                    <Menu className="h-4 w-4" />
                    Standard Sidebar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSidebarStyleChange('mega-menu')}
                    className="flex items-center gap-2"
                  >
                    <Layout className="h-4 w-4" />
                    Mega Menu Sidebar
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>• <strong>Standard:</strong> Simple list-style navigation</p>
                <p>• <strong>Mega Menu:</strong> Organized groups with collapsible sections</p>
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
