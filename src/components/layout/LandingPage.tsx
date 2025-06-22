
import React from 'react';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingHero } from '../landing/LandingHero';
import { LandingFeatures } from '../landing/LandingFeatures';
import { LandingPricing } from '../landing/LandingPricing';
import { LandingFooter } from '../landing/LandingFooter';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingFooter />
    </div>
  );
};
