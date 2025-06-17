
import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check both window width and user agent for comprehensive mobile detection
      const width = window.innerWidth;
      const userAgent = navigator.userAgent;
      
      // Width-based detection (tablets and phones)
      const isNarrowScreen = width < 768;
      
      // User agent detection for mobile devices
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      // Touch capability detection
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Consider mobile if narrow screen OR (mobile user agent AND touch capable)
      setIsMobile(isNarrowScreen || (isMobileUA && hasTouch));
    };

    // Initial check
    checkIsMobile();

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile);
    
    // Listen for orientation changes (mobile specific)
    window.addEventListener('orientationchange', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', checkIsMobile);
    };
  }, []);

  return isMobile;
};
