
import { useState, useEffect } from 'react';
import { AppHeader } from "./AppHeader";
import { UnifiedSidebar } from "./UnifiedSidebar";
import { SectionRenderer } from "./layout/SectionRenderer";
import { sections } from "./layout/SectionTypes";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { InvitationAcceptance } from "./auth/InvitationAcceptance";

export const AppLayout = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isInvitationFlow, setIsInvitationFlow] = useState(false);
  const [invitationToken, setInvitationToken] = useState('');

  useEffect(() => {
    // Check if this is an invitation acceptance flow
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token && window.location.pathname === '/accept-invitation') {
      setInvitationToken(token);
      setIsInvitationFlow(true);
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

  const handleInvitationComplete = () => {
    setIsInvitationFlow(false);
    // Redirect to login
    window.history.pushState({}, '', '/');
  };

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
        <div className="min-h-screen bg-background flex flex-col">
          <AppHeader onSectionChange={setActiveSection} />
          
          <div className="flex flex-1">
            <UnifiedSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              sections={sections}
              isVisible={true}
            />

            <main 
              className="flex-1 transition-all duration-300 pt-16" 
              style={{ marginLeft: `${sidebarWidth}px` }}
            >
              <SectionRenderer activeSection={activeSection} />
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
};
