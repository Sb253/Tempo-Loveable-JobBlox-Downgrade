
import { useState, useEffect } from 'react';

interface CompanyData {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  logo: string | null;
}

const defaultCompanyData: CompanyData = {
  name: 'Your Construction Company',
  address: '123 Business Street',
  city: 'City, State 12345',
  phone: '(555) 123-4567',
  email: 'info@yourcompany.com',
  website: 'www.yourcompany.com',
  logo: null
};

export const useCompanyData = () => {
  const [companyData, setCompanyData] = useState<CompanyData>(defaultCompanyData);

  useEffect(() => {
    const stored = localStorage.getItem('companySettings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCompanyData({ ...defaultCompanyData, ...parsed });
      } catch (error) {
        console.error('Error parsing company settings:', error);
      }
    }
  }, []);

  return companyData;
};
