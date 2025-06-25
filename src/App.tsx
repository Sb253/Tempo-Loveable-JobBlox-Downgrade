import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Layouts & Auth
import { ResponsiveLayout } from "./components/layout/ResponsiveLayout";
import { MultiTenantAuth } from "./components/auth/MultiTenantAuth";
import { DeveloperLoginPage } from "./components/layout/DeveloperLoginPage";
import { LandingPage } from "./components/layout/LandingPage";
import { MultiTenantLayout } from "./components/layout/MultiTenantLayout";

// Shimmer loader
import { ShimmerLoader } from "./components/ui/ShimmerLoader";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ProfileSettingsPage = lazy(() => import("./pages/ProfileSettingsPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const MeetingsPage = lazy(() => import("./pages/MeetingsPage"));
const Index = lazy(() => import("./pages/Index"));
const MembersArea = lazy(() => import("./pages/MembersArea"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="saas-platform-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<ShimmerLoader />}>
              <Routes>
                {/* Public / Landing Routes */}
                <Route path="/welcome" element={<LandingPage />} />
                <Route path="/developer" element={<DeveloperLoginPage />} />
                <Route path="/auth" element={<MultiTenantAuth />} />

                {/* Core App */}
                <Route path="/" element={<ResponsiveLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profile" element={<ProfileSettingsPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="meetings" element={<MeetingsPage />} />
                </Route>

                {/* Optional Multi-Tenant / Legacy */}
                <Route path="/saas/*" element={<MultiTenantLayout />} />
                <Route path="/legacy" element={<Index />} />
                <Route path="/members" element={<MembersArea />} />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
