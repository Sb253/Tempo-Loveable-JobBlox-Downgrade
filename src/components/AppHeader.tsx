
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Bell, Settings, User, LogOut, Building2, Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const AppHeader = () => {
  const [searchValue, setSearchValue] = useState('');
  const [notifications] = useState(3);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Logo and Company */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JobBlox
              </h1>
              <p className="text-xs text-muted-foreground">Construction CRM</p>
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

        {/* Right side - User info and actions */}
        <div className="flex items-center gap-3">
          {/* Energy/Credits */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full border border-yellow-500/20">
            <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium">1,247</span>
          </div>

          {/* Score/Points */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">★</span>
            </div>
            <span className="text-sm font-medium">113.6K</span>
          </div>

          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                {notifications}
              </Badge>
            )}
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
              <DropdownMenuItem>
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
  );
};
