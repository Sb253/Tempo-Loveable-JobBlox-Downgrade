
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Palette, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "./ThemeProvider";

interface CustomTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  card: string;
  isActive: boolean;
}

export const CustomThemeList = () => {
  const { toast } = useToast();
  const { setTheme, actualTheme } = useTheme();
  const [themes, setThemes] = useState<CustomTheme[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTheme, setEditingTheme] = useState<CustomTheme | null>(null);
  const [newTheme, setNewTheme] = useState<Omit<CustomTheme, 'id' | 'isActive'>>({
    name: '',
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6',
    background: '#ffffff',
    foreground: '#0f172a',
    card: '#ffffff'
  });

  useEffect(() => {
    const savedThemes = localStorage.getItem('customThemes');
    if (savedThemes) {
      setThemes(JSON.parse(savedThemes));
    } else {
      // Enhanced colorful default themes
      const defaultThemes: CustomTheme[] = [
        {
          id: '1',
          name: 'Electric Purple',
          primary: '#8B5CF6',
          secondary: '#A78BFA',
          accent: '#C084FC',
          background: '#F3F4F6',
          foreground: '#111827',
          card: '#FFFFFF',
          isActive: false
        },
        {
          id: '2',
          name: 'Ocean Breeze',
          primary: '#06B6D4',
          secondary: '#0891B2',
          accent: '#22D3EE',
          background: '#F0F9FF',
          foreground: '#0F172A',
          card: '#FFFFFF',
          isActive: false
        },
        {
          id: '3',
          name: 'Sunset Orange',
          primary: '#F97316',
          secondary: '#EA580C',
          accent: '#FB923C',
          background: '#FFF7ED',
          foreground: '#1F2937',
          card: '#FFFFFF',
          isActive: false
        },
        {
          id: '4',
          name: 'Forest Emerald',
          primary: '#059669',
          secondary: '#047857',
          accent: '#10B981',
          background: '#F0FDF4',
          foreground: '#064E3B',
          card: '#FFFFFF',
          isActive: false
        },
        {
          id: '5',
          name: 'Cherry Blossom',
          primary: '#EC4899',
          secondary: '#DB2777',
          accent: '#F472B6',
          background: '#FDF2F8',
          foreground: '#831843',
          card: '#FFFFFF',
          isActive: false
        }
      ];
      setThemes(defaultThemes);
      localStorage.setItem('customThemes', JSON.stringify(defaultThemes));
    }
  }, []);

  const saveThemes = (updatedThemes: CustomTheme[]) => {
    setThemes(updatedThemes);
    localStorage.setItem('customThemes', JSON.stringify(updatedThemes));
  };

  const handleAddTheme = () => {
    if (!newTheme.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a theme name",
        variant: "destructive"
      });
      return;
    }

    const theme: CustomTheme = {
      ...newTheme,
      id: Date.now().toString(),
      isActive: false
    };

    const updatedThemes = [...themes, theme];
    saveThemes(updatedThemes);

    setNewTheme({
      name: '',
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff'
    });
    setShowAddDialog(false);

    toast({
      title: "Theme Added",
      description: `${theme.name} has been added to your custom themes`,
    });
  };

  const handleEditTheme = (theme: CustomTheme) => {
    setEditingTheme(theme);
    setNewTheme({
      name: theme.name,
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent,
      background: theme.background,
      foreground: theme.foreground,
      card: theme.card
    });
    setShowAddDialog(true);
  };

  const handleUpdateTheme = () => {
    if (!editingTheme || !newTheme.name.trim()) return;

    const updatedThemes = themes.map(theme =>
      theme.id === editingTheme.id
        ? { ...theme, ...newTheme }
        : theme
    );
    saveThemes(updatedThemes);

    setEditingTheme(null);
    setShowAddDialog(false);
    setNewTheme({
      name: '',
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff'
    });

    toast({
      title: "Theme Updated",
      description: "Your theme has been updated successfully",
    });
  };

  const handleDeleteTheme = (themeId: string) => {
    const updatedThemes = themes.filter(theme => theme.id !== themeId);
    saveThemes(updatedThemes);

    toast({
      title: "Theme Deleted",
      description: "Theme has been removed",
    });
  };

  const applyTheme = (theme: CustomTheme) => {
    const updatedThemes = themes.map(t => ({ ...t, isActive: t.id === theme.id }));
    saveThemes(updatedThemes);

    // Apply CSS custom properties with enhanced colorful styling
    const root = document.documentElement;
    root.style.setProperty('--primary', `${theme.primary.replace('#', '')}`);
    root.style.setProperty('--secondary', `${theme.secondary.replace('#', '')}`);
    root.style.setProperty('--accent', `${theme.accent.replace('#', '')}`);
    root.style.setProperty('--background', `${theme.background.replace('#', '')}`);
    root.style.setProperty('--foreground', `${theme.foreground.replace('#', '')}`);
    root.style.setProperty('--card', `${theme.card.replace('#', '')}`);

    toast({
      title: "Theme Applied",
      description: `${theme.name} theme is now active`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold colorful-text">Custom Themes</h3>
          <p className="text-sm text-muted-foreground">Create and manage vibrant color themes for your dashboard</p>
        </div>
        <Button className="colorful-button flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Theme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card key={theme.id} className={`relative overflow-hidden ${theme.isActive ? 'ring-2 ring-purple-500 shadow-lg' : 'shadow-md'} bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base flex items-center gap-2">
                  {theme.name}
                  {theme.isActive && <div className="p-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"><Check className="h-3 w-3 text-white" /></div>}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditTheme(theme)}
                    className="hover:bg-purple-100 dark:hover:bg-purple-900"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTheme(theme.id)}
                    className="text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-900"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded-lg border shadow-sm" 
                  style={{ backgroundColor: theme.primary }}
                  title="Primary"
                />
                <div 
                  className="w-8 h-8 rounded-lg border shadow-sm" 
                  style={{ backgroundColor: theme.secondary }}
                  title="Secondary"
                />
                <div 
                  className="w-8 h-8 rounded-lg border shadow-sm" 
                  style={{ backgroundColor: theme.accent }}
                  title="Accent"
                />
                <div 
                  className="w-8 h-8 rounded-lg border shadow-sm" 
                  style={{ backgroundColor: theme.background }}
                  title="Background"
                />
              </div>
              
              <Button
                variant={theme.isActive ? "default" : "outline"}
                size="sm"
                className={`w-full ${theme.isActive ? 'colorful-button' : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950 dark:hover:to-pink-950'}`}
                onClick={() => applyTheme(theme)}
                disabled={theme.isActive}
              >
                {theme.isActive ? "Active" : "Apply Theme"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Theme Dialog */}
      {showAddDialog && (
        <Dialog open={true} onOpenChange={() => {
          setShowAddDialog(false);
          setEditingTheme(null);
          setNewTheme({
            name: '',
            primary: '#3b82f6',
            secondary: '#64748b',
            accent: '#8b5cf6',
            background: '#ffffff',
            foreground: '#0f172a',
            card: '#ffffff'
          });
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingTheme ? 'Edit Theme' : 'Add New Theme'}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme-name">Theme Name</Label>
                <Input
                  id="theme-name"
                  value={newTheme.name}
                  onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                  placeholder="Enter theme name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary"
                      type="color"
                      value={newTheme.primary}
                      onChange={(e) => setNewTheme({ ...newTheme, primary: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={newTheme.primary}
                      onChange={(e) => setNewTheme({ ...newTheme, primary: e.target.value })}
                      placeholder="#3b82f6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary"
                      type="color"
                      value={newTheme.secondary}
                      onChange={(e) => setNewTheme({ ...newTheme, secondary: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={newTheme.secondary}
                      onChange={(e) => setNewTheme({ ...newTheme, secondary: e.target.value })}
                      placeholder="#64748b"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent"
                      type="color"
                      value={newTheme.accent}
                      onChange={(e) => setNewTheme({ ...newTheme, accent: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={newTheme.accent}
                      onChange={(e) => setNewTheme({ ...newTheme, accent: e.target.value })}
                      placeholder="#8b5cf6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="background"
                      type="color"
                      value={newTheme.background}
                      onChange={(e) => setNewTheme({ ...newTheme, background: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={newTheme.background}
                      onChange={(e) => setNewTheme({ ...newTheme, background: e.target.value })}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={editingTheme ? handleUpdateTheme : handleAddTheme}>
                  {editingTheme ? 'Update Theme' : 'Add Theme'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
