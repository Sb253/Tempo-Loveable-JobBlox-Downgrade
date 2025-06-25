import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppHeader } from "../AppHeader";
import { UnifiedSidebar } from "../UnifiedSidebar";
import { MobileSidebar } from "../mobile/MobileSidebar";
import { sections } from "./SectionTypes";
import { useIsMobile } from "../../hooks/useIsMobile";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { InvitationAcceptance } from "../auth/InvitationAcceptance";

export const ResponsiveLayout = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isInvitationFlow, setIsInvitationFlow] = useState(false);
  const [invitationToken, setInvitationToken] = useState("");

  const activeSection =
    location.pathname === "/" ? "home" : location.pathname.split("/")[1];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token && location.pathname === "/accept-invitation") {
      setInvitationToken(token);
      setIsInvitationFlow(true);
    }

    if (!isMobile) {
      const handleSidebarToggle = () => {
        const isCollapsed = JSON.parse(
          localStorage.getItem("sidebarCollapsed") || "false",
        );
        setSidebarWidth(isCollapsed ? 64 : 256);
      };

      handleSidebarToggle();
      window.addEventListener("storage", handleSidebarToggle);
      window.addEventListener("sidebarToggle", handleSidebarToggle);
      return () => {
        window.removeEventListener("storage", handleSidebarToggle);
        window.removeEventListener("sidebarToggle", handleSidebarToggle);
      };
    }
  }, [isMobile, location.pathname]);

  const handleSectionChange = (section: string) => {
    navigate(section === "home" ? "/" : `/${section}`);
    if (isMobile) setIsMobileSidebarOpen(false);
  };

  const handleInvitationComplete = () => {
    setIsInvitationFlow(false);
    navigate("/");
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
        <div className="min-h-screen bg-background">
          <AppHeader
            onSectionChange={handleSectionChange}
            onMobileSidebarToggle={() =>
              setIsMobileSidebarOpen(!isMobileSidebarOpen)
            }
            isMobile={isMobile}
          />

          <div className="flex">
            {!isMobile && (
              <UnifiedSidebar
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                sections={sections}
                isVisible={true}
              />
            )}
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
              className={`flex-1 transition-all duration-300 pt-16`}
              style={{ marginLeft: isMobile ? "0" : `${sidebarWidth}px` }}
            >
              <Outlet />
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
};
