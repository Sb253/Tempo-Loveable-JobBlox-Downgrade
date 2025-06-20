
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SaaSApp } from "./components/SaaSApp";
import Index from "./pages/Index";
import MembersArea from "./pages/MembersArea";
import NotFound from "./pages/NotFound";
import { LandingPage } from "./components/layout/LandingPage";
import { DeveloperLoginPage } from "./components/layout/DeveloperLoginPage";
import { MultiTenantAuth } from "./components/auth/MultiTenantAuth";
import { MultiTenantLayout } from "./components/layout/MultiTenantLayout";
import React, { useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'developer' | 'saas' | 'legacy'>('landing');
  const [userType, setUserType] = useState<'admin' | 'tenant' | 'trial' | null>(null);

  const handleNavigation = (path: string) => {
    switch (path) {
      case '/':
        setCurrentView('landing');
        setUserType(null);
        break;
      case '/developer':
        setCurrentView('developer');
        break;
      case '/auth':
      case '/tenant-login':
      case '/admin-login':
      case '/trial-signup':
        setCurrentView('saas');
        setUserType(null);
        break;
      case '/legacy':
        setCurrentView('legacy');
        break;
    }
  };

  const handleLogin = (type: 'admin' | 'tenant' | 'trial') => {
    setUserType(type);
    setCurrentView('saas');
  };

  const renderCurrentView = () => {
    if (currentView === 'landing') {
      return <LandingPage onNavigate={handleNavigation} />;
    }
    
    if (currentView === 'developer') {
      return <DeveloperLoginPage onLogin={handleLogin} onNavigate={handleNavigation} />;
    }
    
    if (currentView === 'legacy') {
      return <Index />;
    }
    
    if (currentView === 'saas') {
      if (!userType) {
        return <MultiTenantAuth onLogin={handleLogin} />;
      }
      return <MultiTenantLayout />;
    }
    
    return <LandingPage onNavigate={handleNavigation} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="saas-platform-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={renderCurrentView()} />
              <Route path="/developer" element={<DeveloperLoginPage onLogin={handleLogin} onNavigate={handleNavigation} />} />
              <Route path="/legacy" element={<Index />} />
              <Route path="/members" element={<MembersArea />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
