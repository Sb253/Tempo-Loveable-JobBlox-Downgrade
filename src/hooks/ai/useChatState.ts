
import { useState } from 'react';

export const useChatState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState('general');

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    isLoading,
    setIsLoading,
    selectedMode,
    setSelectedMode
  };
};
