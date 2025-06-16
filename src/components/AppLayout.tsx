
import { useState, useEffect } from 'react';
import { AppHeader } from "./AppHeader";
import { MegaMenuSidebar } from "./MegaMenuSidebar";
import { SectionRenderer } from "./SectionRenderer";
import { sections } from "./AppLayoutTypes";

export const AppLayout = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState) {
      setSidebarCollapsed(JSON.parse(savedCollapsedState));
    }
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  const sidebarWidth = sidebarCollapsed ? 64 : 256;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader onSectionChange={setActiveSection} />
      
      <div className="flex flex-1">
        <MegaMenuSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sections={sections}
          isVisible={true}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
        />

        <main 
          className="flex-1 transition-all duration-300 pt-16" 
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <SectionRenderer 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </main>
      </div>
    </div>
  );
};
