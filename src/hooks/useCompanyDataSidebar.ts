
import { useState, useEffect } from 'react';

interface CompanyData {
  name: string;
  logo: string | null;
  displayInHeader: boolean;
  useCustomHeaderName: boolean;
  headerCompanyName: string;
}

export const useCompanyDataSidebar = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'JobBlox',
    logo: null,
    displayInHeader: true,
    useCustomHeaderName: false,
    headerCompanyName: 'JobBlox'
  });

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
  }, []);

  return companyData;
};
