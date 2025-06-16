
import { useState, useEffect } from 'react';

export const useSidebarState = (activeSection: string) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openGroups, setOpenGroups] = useState<string[]>(['customers']);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState) {
      setIsCollapsed(JSON.parse(savedCollapsedState));
    }

    const savedOpenGroups = localStorage.getItem('sidebarOpenGroups');
    if (savedOpenGroups) {
      try {
        setOpenGroups(JSON.parse(savedOpenGroups));
      } catch (error) {
        console.error('Error parsing open groups:', error);
      }
    }
  }, []);

  // Save sidebar state changes and dispatch custom event
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    window.dispatchEvent(new CustomEvent('sidebarToggle'));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem('sidebarOpenGroups', JSON.stringify(openGroups));
  }, [openGroups]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return {
    isCollapsed,
    searchTerm,
    openGroups,
    setSearchTerm,
    setOpenGroups,
    toggleCollapse,
    toggleGroup
  };
};
