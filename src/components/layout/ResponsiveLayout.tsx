
import { useState, useEffect } from 'react';
import { AppHeader } from "../AppHeader";
import { UnifiedSidebar } from "../UnifiedSidebar";
import { SectionRenderer } from "./SectionRenderer";
import { sections } from "./SectionTypes";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { InvitationAcceptance } from "../auth/InvitationAcceptance";
import { MobileSidebar } from "../mobile/MobileSidebar";
import { useIsMobile } from "../../hooks/useIsMobile";

export const ResponsiveLayout = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isInvitationFlow, setIsInvitationFlow] = useState(false);
  const [invitationToken, setInvitationToken] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
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

    // Listen for sidebar width changes (desktop only)
    if (!isMobile) {
      const handleSidebarToggle = () => {
        const isCollapsed = JSON.parse(localStorage.getItem('sidebarCollapsed') || 'false');
        setSidebarWidth(isCollapsed ? 64 : 256);
      };

      handleSidebarToggle();
      window.addEventListener('storage', handleSidebarToggle);
      window.addEventListener('sidebarToggle', handleSidebarToggle);

      return () => {
        window.removeEventListener('storage', handleSidebarToggle);
        window.removeEventListener('sidebarToggle', handleSidebarToggle);
      };
    }
  }, [isMobile]);

  // Save active section when it changes
  useEffect(() => {
    if (activeSection) {
      localStorage.setItem('activeSection', activeSection);
      console.log('ResponsiveLayout: Active section changed to:', activeSection);
    }
  }, [activeSection]);

  const handleSectionChange = (section: string) => {
    console.log('ResponsiveLayout: Section change requested:', section);
    setActiveSection(section);
    
    // Close mobile sidebar when navigating
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
    
    // Update URL without full page reload
    const newUrl = section === 'home' ? '/' : `/${section}`;
    window.history.pushState({ section }, '', newUrl);
  };

  const handleInvitationComplete = () => {
    setIsInvitationFlow(false);
    window.history.pushState({}, '', '/');
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname;
      if (path === '/') {
        setActiveSection('home');
      } else {
        const section = path.slice(1);
        if (sections.find(s => s.id === section)) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
        <div className="min-h-screen bg-background">
          <AppHeader 
            onSectionChange={handleSectionChange}
            onMobileSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            isMobile={isMobile}
          />
          
          <div className="flex">
            {/* Desktop Sidebar */}
            {!isMobile && (
              <UnifiedSidebar
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                sections={sections}
                isVisible={true}
              />
            )}

            {/* Mobile Sidebar */}
            {isMobile && (
              <MobileSidebar
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                sections={sections}
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
              />
            )}

            <main 
              className={`flex-1 transition-all duration-300 ${
                isMobile ? 'pt-16' : 'pt-16'
              }`}
              style={{ 
                marginLeft: isMobile ? '0' : `${sidebarWidth}px`
              }}
            >
              <SectionRenderer activeSection={activeSection} />
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
};
