
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import MembersArea from "./pages/MembersArea";
import NotFound from "./pages/NotFound";
import { LandingPage } from "./components/layout/LandingPage";
import { DeveloperLoginPage } from "./components/layout/DeveloperLoginPage";
import { MultiTenantAuth } from "./components/auth/MultiTenantAuth";
import { MultiTenantLayout } from "./components/layout/MultiTenantLayout";
import React from 'react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="saas-platform-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/developer" element={<DeveloperLoginPage />} />
              <Route path="/auth" element={<MultiTenantAuth />} />
              <Route path="/saas/*" element={<MultiTenantLayout />} />
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
