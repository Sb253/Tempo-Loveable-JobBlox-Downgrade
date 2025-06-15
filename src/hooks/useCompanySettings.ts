
import { useState, useEffect } from 'react';

interface CompanySettings {
  companyName: string;
  businessAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
  businessLicense: string;
  contractorLicense: string;
  stateLicense: string;
  insurancePolicy: string;
  bonded: boolean;
  showLicense: boolean;
  showInsurance: boolean;
  showBonded: boolean;
  showWebsite: boolean;
  showEmail: boolean;
  showAddress: boolean;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  defaultFont: string;
}

const defaultSettings: CompanySettings = {
  companyName: 'Your Construction Company',
  businessAddress: '123 Business Street',
  city: 'City, State 12345',
  state: 'California',
  zipCode: '12345',
  phone: '(555) 123-4567',
  email: 'info@yourcompany.com',
  website: 'www.yourcompany.com',
  businessLicense: 'BL-123456',
  contractorLicense: 'CL-789012',
  stateLicense: 'SL-345678',
  insurancePolicy: 'INS-901234',
  bonded: true,
  showLicense: true,
  showInsurance: true,
  showBonded: true,
  showWebsite: true,
  showEmail: true,
  showAddress: true,
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  accentColor: '#10B981',
  defaultFont: 'sans'
};

export const useCompanySettings = () => {
  const [settings, setSettings] = useState<CompanySettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error parsing company settings:', error);
      }
    }
  }, []);

  return settings;
};
