
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Bell, Settings, User, LogOut, Building2, Zap, Map, Video } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { InternalMeetings } from "./InternalMeetings";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AppHeaderProps {
  onSectionChange?: (section: string) => void;
}

interface CompanyData {
  companyName: string;
  logo?: string;
}

export const AppHeader = ({ onSectionChange }: AppHeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [notifications] = useState(3);
  const [showMeetings, setShowMeetings] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: 'JobBlox',
    logo: undefined
  });

  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      try {
        const data = JSON.parse(savedCompanyData);
        setCompanyData({
          companyName: data.name || data.companyName || 'JobBlox',
          logo: data.logo
        });
      } catch (error) {
        console.error('Error parsing company settings:', error);
      }
    }

    // Listen for company settings changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'companySettings' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          setCompanyData({
            companyName: data.name || data.companyName || 'JobBlox',
            logo: data.logo
          });
        } catch (error) {
          console.error('Error parsing updated company settings:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNotificationClick = () => {
    if (onSectionChange) {
      onSectionChange('notifications');
    }
  };

  const handleMapClick = () => {
    if (onSectionChange) {
      onSectionChange('map-view');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left side - Company Logo & Name */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {companyData.logo ? (
                <img 
                  src={companyData.logo} 
                  alt="Company Logo" 
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              )}
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {companyData.companyName}
                </h1>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, customers, or projects..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Internal Meetings */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowMeetings(true)}
              className="relative"
            >
              <Video className="h-5 w-5" />
            </Button>

            {/* Notifications Bell */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Maps Button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleMapClick}
              className="relative"
            >
              <Map className="h-5 w-5" />
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 px-2 gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Project Manager</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange?.('company-settings')}>
                  <Building2 className="mr-2 h-4 w-4" />
                  Company Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Internal Meetings Dialog */}
      {showMeetings && (
        <Dialog open={true} onOpenChange={setShowMeetings}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Internal Meetings</DialogTitle>
            </DialogHeader>
            <InternalMeetings />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
