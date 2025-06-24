
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Settings, 
  User, 
  LogOut, 
  Bell,
  Search,
  Menu,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface BusinessHeaderProps {
  onSectionChange: (section: string) => void;
  onMobileSidebarToggle?: () => void;
  isMobile?: boolean;
}

export const BusinessHeader = ({ onSectionChange, onMobileSidebarToggle, isMobile = false }: BusinessHeaderProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 z-30 px-4 md:px-6">
      <div className="flex items-center justify-between h-full">
        {/* Left side - Mobile Menu + Logo and Search */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          {isMobile && onMobileSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileSidebarToggle}
              className="h-8 w-8"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              JobBlox
            </h1>
          </div>
          
          {/* Desktop Search */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </form>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Search Button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}

          {/* Internal Meetings */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onSectionChange('internal-meetings')}
            className="h-8 w-8"
            title="Internal Meetings"
          >
            <Calendar className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onSectionChange('notifications')}
            className="h-8 w-8"
          >
            <Bell className="h-4 w-4" />
          </Button>

          {/* Settings - Desktop Only */}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onSectionChange('settings')}
              className="h-8 w-8"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`flex items-center gap-2 ${isMobile ? 'px-2' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  {!isMobile && (
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">{user?.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.role || 'Member'}
                      </p>
                    </div>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => onSectionChange('profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => onSectionChange('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
