
import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { AppHeader } from "../AppHeader";
import { OptimizedUnifiedSidebar } from "../optimized/OptimizedUnifiedSidebar";
import { OptimizedSectionRenderer } from "./OptimizedSectionRenderer";
import { sections } from "./SectionTypes";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { InvitationAcceptance } from "../auth/InvitationAcceptance";
import { usePerformanceMonitor, logBundleMetrics } from "../../utils/performanceUtils";

export const OptimizedAppLayout = memo(() => {
  usePerformanceMonitor('OptimizedAppLayout');
  
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isInvitationFlow, setIsInvitationFlow] = useState(false);
  const [invitationToken, setInvitationToken] = useState('');

  // Memoize sections to prevent unnecessary re-calculations
  const memoizedSections = useMemo(() => sections, []);

  useEffect(() => {
    // Log bundle metrics on initial load
    logBundleMetrics();
    
    // Check if this is an invitation acceptance flow
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token && window.location.pathname === '/accept-invitation') {
      setInvitationToken(token);
      setIsInvitationFlow(true);
      return;
    }

    // Load saved active section or default to home
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection && sections.find(s => s.id === savedSection)) {
      setActiveSection(savedSection);
    }

    // Listen for sidebar width changes
    const handleSidebarToggle = () => {
      const isCollapsed = JSON.parse(localStorage.getItem('sidebarCollapsed') || 'false');
      setSidebarWidth(isCollapsed ? 64 : 256);
    };

    // Initial check
    handleSidebarToggle();

    // Listen for storage changes
    window.addEventListener('storage', handleSidebarToggle);
    
    // Custom event for immediate updates
    window.addEventListener('sidebarToggle', handleSidebarToggle);

    return () => {
      window.removeEventListener('storage', handleSidebarToggle);
      window.removeEventListener('sidebarToggle', handleSidebarToggle);
    };
  }, []);

  // Save active section when it changes
  useEffect(() => {
    if (activeSection) {
      localStorage.setItem('activeSection', activeSection);
      console.log('OptimizedAppLayout: Active section changed to:', activeSection);
    }
  }, [activeSection]);

  // Use useCallback to prevent unnecessary re-renders of child components
  const handleSectionChange = useCallback((section: string) => {
    console.log('OptimizedAppLayout: Section change requested:', section);
    setActiveSection(section);
    
    // Update URL without full page reload
    const newUrl = section === 'home' ? '/' : `/${section}`;
    window.history.pushState({ section }, '', newUrl);
  }, []);

  const handleInvitationComplete = useCallback(() => {
    setIsInvitationFlow(false);
    // Redirect to login
    window.history.pushState({}, '', '/');
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname;
      if (path === '/') {
        setActiveSection('home');
      } else {
        const section = path.slice(1); // Remove leading slash
        if (sections.find(s => s.id === section)) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Memoize the main layout to prevent unnecessary re-renders
  const mainLayoutContent = useMemo(() => (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader onSectionChange={handleSectionChange} />
      
      <div className="flex flex-1">
        <OptimizedUnifiedSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          sections={memoizedSections}
          isVisible={true}
        />

        <main 
          className="flex-1 transition-all duration-300 pt-16" 
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <OptimizedSectionRenderer activeSection={activeSection} />
        </main>
      </div>
    </div>
  ), [activeSection, handleSectionChange, memoizedSections, sidebarWidth]);

  if (isInvitationFlow) {
    return (
      <AuthProvider>
        <InvitationAcceptance 
          token={invitationToken} 
          onAcceptanceComplete={handleInvitationComplete}
        />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        {mainLayoutContent}
      </ProtectedRoute>
    </AuthProvider>
  );
});

OptimizedAppLayout.displayName = 'OptimizedAppLayout';
