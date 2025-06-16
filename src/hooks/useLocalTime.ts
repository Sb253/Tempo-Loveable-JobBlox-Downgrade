
import { useState, useEffect } from 'react';

export const useLocalTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Get user's timezone
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZone(userTimeZone);
      setIsReady(true);
    } catch (error) {
      // Fallback to UTC if timezone detection fails
      setTimeZone('UTC');
      setIsReady(true);
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    if (!isReady || !timeZone) {
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
    
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        ...options
      }).format(date);
    } catch (error) {
      // Fallback to local time if timezone formatting fails
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  };

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    if (!isReady || !timeZone) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      }).format(date);
    }

    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      }).format(date);
    } catch (error) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      }).format(date);
    }
  };

  const formatDateTime = (date: Date) => {
    if (!isReady || !timeZone) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    }

    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    } catch (error) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    }
  };

  return {
    currentTime,
    timeZone: timeZone || 'Local',
    isReady,
    formatTime,
    formatDate,
    formatDateTime
  };
};
