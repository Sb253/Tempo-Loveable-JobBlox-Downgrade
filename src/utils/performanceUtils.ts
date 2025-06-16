
import React, { useState, useEffect, useRef } from 'react';

// Performance monitoring utility
export const usePerformanceMonitor = (componentName: string) => {
  const renderCountRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    renderCountRef.current += 1;
    startTimeRef.current = performance.now();
    
    console.log(`${componentName} render #${renderCountRef.current} started`);
    
    return () => {
      const endTime = performance.now();
      console.log(`${componentName} render completed in ${endTime - startTimeRef.current}ms`);
    };
  });

  return { renderCount: renderCountRef.current };
};

// Debounce utility for search and input optimization
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memory usage tracking
export const trackMemoryUsage = (componentName: string) => {
  if ('memory' in performance) {
    const memInfo = (performance as any).memory;
    console.log(`${componentName} Memory Usage:`, {
      used: `${Math.round(memInfo.usedJSHeapSize / 1048576)}MB`,
      total: `${Math.round(memInfo.totalJSHeapSize / 1048576)}MB`,
      limit: `${Math.round(memInfo.jsHeapSizeLimit / 1048576)}MB`
    });
  }
};

// Bundle size analyzer
export const logBundleMetrics = () => {
  if (typeof window !== 'undefined') {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    console.log('Bundle Performance Metrics:', {
      domContentLoaded: `${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`,
      loadComplete: `${navigation.loadEventEnd - navigation.loadEventStart}ms`,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A',
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 'N/A'
    });
  }
};
