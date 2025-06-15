
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b31c467f9da1476babf3c32da12859e6',
  appName: 'job-flow-pro',
  webDir: 'dist',
  server: {
    url: 'https://b31c467f-9da1-476b-abf3-c32da12859e6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
