import { useState, useEffect } from 'react';

const useSidebar = (defaultOpen = true) => {
  const [isOpen, setIsOpen] = useState(() => {
    // Check localStorage for saved state
    const saved = localStorage.getItem('sidebarOpen');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Default to closed on mobile, open on desktop
    return window.innerWidth >= 1024 ? defaultOpen : false;
  });

  // Save to localStorage whenever isOpen changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Auto-close on mobile when resizing
      if (window.innerWidth < 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    open,
    close,
    setIsOpen,
  };
};

export default useSidebar;
