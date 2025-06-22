
import { useState, useEffect, useCallback } from 'react';

export interface CompanyData {
  name: string;
  logo: string | null;
  displayInHeader: boolean;
  useCustomHeaderName: boolean;
  headerCompanyName: string;
}

export const useOptimizedSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openGroups, setOpenGroups] = useState<string[]>(['customers']);
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'JobBlox',
    logo: null,
    displayInHeader: true,
    useCustomHeaderName: false,
    headerCompanyName: 'JobBlox'
  });

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const toggleGroup = useCallback((groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Load company data and sidebar state
  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      try {
        const data = JSON.parse(savedCompanyData);
        setCompanyData({
          name: data.name || data.companyName || 'JobBlox',
          logo: data.logo || null,
          displayInHeader: data.displayInHeader ?? true,
          useCustomHeaderName: data.useCustomHeaderName ?? false,
          headerCompanyName: data.headerCompanyName || 'JobBlox'
        });
      } catch (error) {
        console.error('Error parsing company settings:', error);
      }
    }

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

  return {
    isCollapsed,
    searchTerm,
    openGroups,
    companyData,
    toggleCollapse,
    toggleGroup,
    handleSearchChange,
    setOpenGroups
  };
};
