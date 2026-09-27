import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
