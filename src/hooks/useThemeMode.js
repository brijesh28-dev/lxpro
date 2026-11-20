import { useState, useEffect } from 'react';

/**
 * React hook that reactively tracks whether the application is in dark mode.
 * Synchronizes with `document.documentElement` class changes (e.g. via AnimatedThemeToggler).
 */
export default function useThemeMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const checkTheme = () => {
      const dark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      setIsDark(Boolean(dark));
    };

    // Immediately reconcile state on mount
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('storage', checkTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', checkTheme);
    };
  }, []);

  return isDark;
}

