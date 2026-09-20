import { useEffect, useRef, useState } from 'react';

export const desktopMedia = '(min-width: 960px)';

export function useMobileNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreMenuFocus = useRef(false);

  const closeMobileNavigation = () => {
    shouldRestoreMenuFocus.current = true;
    setMobileOpen(false);
  };

  const restoreMenuFocus = () => {
    if (
      shouldRestoreMenuFocus.current &&
      !window.matchMedia?.(desktopMedia).matches
    ) {
      menuButtonRef.current?.focus();
    }
    shouldRestoreMenuFocus.current = false;
  };

  useEffect(() => {
    if (!window.matchMedia) return;
    const desktop = window.matchMedia(desktopMedia);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        shouldRestoreMenuFocus.current = false;
        setMobileOpen(false);
      }
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return {
    mobileOpen,
    setMobileOpen,
    menuButtonRef,
    closeMobileNavigation,
    restoreMenuFocus,
  };
}
