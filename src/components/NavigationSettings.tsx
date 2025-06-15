
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Menu, Settings } from "lucide-react";

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
  const [selectedLayout, setSelectedLayout] = useState(currentLayout);

  const handleSave = () => {
    onLayoutChange(selectedLayout);
    localStorage.setItem('navigationLayout', selectedLayout);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Navigation Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Layout Preference</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Choose how you want to navigate through the application
            </p>
          </div>

          <RadioGroup value={selectedLayout} onValueChange={(value: 'sidebar' | 'menu') => setSelectedLayout(value)}>
            <div className="space-y-3">
              <Card className={`cursor-pointer transition-colors ${selectedLayout === 'sidebar' ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sidebar" id="sidebar" />
                    <Label htmlFor="sidebar" className="flex items-center gap-2 cursor-pointer">
                      <Layout className="h-4 w-4" />
                      Sidebar Navigation
                    </Label>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Fixed sidebar on the left with all navigation options visible
                  </p>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-colors ${selectedLayout === 'menu' ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="menu" id="menu" />
                    <Label htmlFor="menu" className="flex items-center gap-2 cursor-pointer">
                      <Menu className="h-4 w-4" />
                      Top Menu Navigation
                    </Label>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Horizontal menu bar at the top with dropdown sections
                  </p>
                </CardContent>
              </Card>
            </div>
          </RadioGroup>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
