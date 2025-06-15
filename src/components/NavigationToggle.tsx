
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sidebar, Menu, LayoutDashboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavigationToggleProps {
  currentLayout: 'sidebar' | 'menu';
  onLayoutChange: (layout: 'sidebar' | 'menu') => void;
}

export const NavigationToggle = ({ currentLayout, onLayoutChange }: NavigationToggleProps) => {
  const { toast } = useToast();

  const handleLayoutChange = (layout: 'sidebar' | 'menu') => {
    console.log('NavigationToggle: Changing layout to:', layout);
    onLayoutChange(layout);
    localStorage.setItem('navigationLayout', layout);
    toast({
      title: "Navigation Updated",
      description: `Switched to ${layout} navigation`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Label className="text-sm font-medium">Navigation:</Label>
      <div className="flex rounded-lg border p-1 bg-muted/50">
        <Button
          variant={currentLayout === 'sidebar' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLayoutChange('sidebar')}
          className="flex items-center gap-2 h-8"
        >
          <Sidebar className="h-3 w-3" />
          <span className="hidden sm:inline">Sidebar</span>
        </Button>
        <Button
          variant={currentLayout === 'menu' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLayoutChange('menu')}
          className="flex items-center gap-2 h-8"
        >
          <Menu className="h-3 w-3" />
          <span className="hidden sm:inline">Menu</span>
        </Button>
      </div>
    </div>
  );
};
